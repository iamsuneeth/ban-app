import React from "react";
import * as SecureStore from "expo-secure-store";
import { useEffect, useReducer } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Platform } from "react-native";
import { FirebaseLogin } from "../components/prelogin/login/FirebaseLogin";
import { Request, FirebaseClient as firebase } from "bank-core";
import Axios from "axios";

export const LoginContainer = ({ navigation }) => {
  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    {
      authenticated: false,
      modalVisible: false,
      failedCount: 0,
      biometryAvailable: false,
      biometryEnabled: false,
      initialized: false
    }
  );

  const fetchToken = async () => {
    try {
      const isBiometryAvailable = await LocalAuthentication.hasHardwareAsync();
      if (!isBiometryAvailable) {
        setState({
          initialized: true
        });
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
            initialized: true
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
        } else {
          setState({
            failedCount: state.failedCount + 1
          });
        }
      } else {
        setState({
          initialized: true
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchToken();
  }, [state.failedCount]);

  return state.initialized ? <FirebaseLogin navigation={navigation} /> : null;
};
