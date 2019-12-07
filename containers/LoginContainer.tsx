import React from "react";
import * as SecureStore from "expo-secure-store";
import { useEffect, useReducer } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Platform } from "react-native";
import { FirebaseLogin } from "../components/prelogin/login/FirebaseLogin";

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
      const token = await SecureStore.getItemAsync("loginToken");
      if (token) {
        if (Platform.OS === "android") {
          setState({
            modalVisible: true
          });
        } else {
          const results = await LocalAuthentication.authenticateAsync();
          if (results.success) {
            console.log("success");
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    setState({
      initialized: true
    });
  };
  useEffect(() => {
    fetchToken();
  }, []);

  return state.initialized ? <FirebaseLogin navigation={navigation} /> : null;
};
