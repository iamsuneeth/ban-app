import React, { useRef } from "react";
import * as SecureStore from "expo-secure-store";
import { useEffect, useReducer } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Platform, AppState } from "react-native";
import { FirebaseLogin } from "../components/prelogin/login/FirebaseLogin";
import * as firebase from "firebase/app";
import BottomSheet from "reanimated-bottom-sheet";
import { useAuthState } from "bank-core";

export const LoginContainer = () => {
  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    {
      checkComplete: false,
      authenticated: false,
      modalVisible: false,
      failedCount: 0,
      biometryAvailable: false,
      biometryEnabled: false,
      userCancelled: false
    }
  );

  const sheetRef = useRef<BottomSheet>();

  const { signInSuccess } = useAuthState();

  const authPrompt = async () => {
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
        authenticated: true
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
        setState({
          checkComplete: true
        });
        return;
      }
      const enabled = await SecureStore.getItemAsync("biometryEnabled");
      if (enabled) {
        setState({
          biometryAvailable: true,
          biometryEnabled: true,
          checkComplete: true
        });
      } else {
        setState({
          checkComplete: true
        });
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
      onSuccess={signInSuccess}
      modalVisible={state.modalVisible}
      biometryAvailable={state.biometryAvailable}
      authenticated={state.authenticated}
      cancelAuthentication={cancelAuthentication}
      sheetRef={sheetRef}
      authPrompt={authPrompt}
      checkComplete={state.checkComplete}
      userCancelled={state.userCancelled}
    />
  );
};
