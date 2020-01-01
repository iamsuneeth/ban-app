import React from "react";
import * as SecureStore from "expo-secure-store";
import { useEffect, useReducer } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Platform } from "react-native";
import { FirebaseLogin } from "../components/prelogin/login/FirebaseLogin";
import * as firebase from "firebase/app";

export const LoginContainer = ({ navigation }) => {
  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    {
      authenticated: false,
      modalVisible: false,
      failedCount: 0,
      biometryAvailable: false,
      biometryEnabled: false
    }
  );

  const fetchToken = async () => {
    try {
      const isBiometryAvailable = await LocalAuthentication.hasHardwareAsync();
      if (!isBiometryAvailable) {
        return;
      }
      const enabled = await SecureStore.getItemAsync("biometryEnabled");
      if (enabled) {
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
        console.log(results);
        if (results.success) {
          setState({
            modalVisible: false,
            authenticated: true,
            initialized: true
          });
        } else if ((results as any).error === "user_cancel") {
          await firebase.auth().signOut();
          setState({
            modalVisible: false
          });
        } else {
          setState({
            failedCount: state.failedCount + 1
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchToken();
  }, [state.failedCount]);

  const cancelAuthentication = () => {
    LocalAuthentication.cancelAuthenticate();
  };
  return (
    <FirebaseLogin
      navigation={navigation}
      modalVisible={state.modalVisible}
      authenticated={state.authenticated}
      cancelAuthentication={cancelAuthentication}
    />
  );
};
