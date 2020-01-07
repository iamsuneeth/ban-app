import React, { useRef, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { FirebaseLogin } from "../components/prelogin/login/FirebaseLogin";
import * as firebase from "firebase/app";
import { useAuthState } from "bank-core";
import { CommonActions } from "@react-navigation/native";

export const LoginContainer = ({ navigation }) => {
  const { signInSuccess } = useAuthState();
  const listenerRef = useRef<firebase.Unsubscribe>();
  const [initialized, setInitialized] = useState();
  const initialize = async user => {
    const isBiometrysupported = await LocalAuthentication.isEnrolledAsync();
    const isBiometryEnabled = await SecureStore.getItemAsync("biometryEnabled");
    listenerRef.current();
    if (user) {
      if (isBiometrysupported && isBiometryEnabled) {
        signInSuccess(user);
        navigation.dispatch(CommonActions.navigate("AuthModal"));
      } else {
        await firebase.auth().signOut();
        setInitialized(true);
      }
    } else {
      setInitialized(true);
    }
  };
  useEffect(
    React.useCallback(() => {
      listenerRef.current = firebase.auth().onAuthStateChanged(initialize);
      return listenerRef.current;
    }, []),
    []
  );
  return initialized ? <FirebaseLogin onSuccess={signInSuccess} /> : null;
};
