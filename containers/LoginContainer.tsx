import React, { useRef } from "react";
import * as SecureStore from "expo-secure-store";
import { useEffect, useReducer } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Platform, AppState } from "react-native";
import { FirebaseLogin } from "../components/prelogin/login/FirebaseLogin";
import * as firebase from "firebase/app";
import BottomSheet from "reanimated-bottom-sheet";

export const LoginContainer = ({ navigation }) => {
  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    {
      authenticated: false,
      modalVisible: false,
      failedCount: 0,
      biometryAvailable: false,
      biometryEnabled: false,
      userCancelled: false
    }
  );

  const sheetRef = useRef<BottomSheet>();

  const authPrompt = async () => {
    if (firebase.auth().currentUser !== null) {
      await firebase.auth().currentUser.getIdToken(true);
    }
    if (state.failedCount >= 3) {
      await firebase.auth().signOut();
      setState({
        modalVisible: false
      });
      return;
    }
    if (Platform.OS === "android") {
      setState({
        modalVisible: true
      });
    }
    const results = await LocalAuthentication.authenticateAsync();
    if (results.success) {
      setState({
        modalVisible: false,
        authenticated: true,
        initialized: true
      });
    } else if ((results as any).error === "user_cancel") {
      await firebase.auth().signOut();
      setState({
        modalVisible: false,
        userCancelled: true
      });
    } else {
      setState({
        failedCount: state.failedCount + 1
      });
    }
  };
  const fetchToken = async () => {
    try {
      const isBiometryAvailable = await LocalAuthentication.hasHardwareAsync();
      if (!isBiometryAvailable) {
        return;
      }
      const enabled = await SecureStore.getItemAsync("biometryEnabled");
      if (enabled) {
        setState({
          biometryAvailable: true,
          biometryEnabled: true
        });
        await authPrompt();
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchToken();
  }, [state.failedCount]);

  const handleStateChange = appState => {
    if (appState === "active") {
      sheetRef.current.snapTo(0);
    }
  };
  useEffect(() => {
    AppState.addEventListener("change", handleStateChange);
    return () => {
      AppState.removeEventListener("change", handleStateChange);
    };
  }, []);

  const cancelAuthentication = () => {
    LocalAuthentication.cancelAuthenticate();
  };
  return (
    <FirebaseLogin
      navigation={navigation}
      modalVisible={state.modalVisible}
      biometryAvailable={state.biometryAvailable}
      authenticated={state.authenticated}
      cancelAuthentication={cancelAuthentication}
      sheetRef={sheetRef}
      authPrompt={authPrompt}
    />
  );
};
