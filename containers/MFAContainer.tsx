import React, { useEffect, useState, useRef } from "react";
import { useAuthState } from "bank-core";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { Biometry } from "../components/common/MFA.tsx/Biometry";
import LottieView from "lottie-react-native";

const MFAContainer = ({ sheetRef }) => {
  const { authState, authFailure, authSuccess } = useAuthState();
  const [modalVisible, setModalVisible] = useState(false);
  const animationRef = useRef<LottieView>();
  const launchPrompt = async () => {
    try {
      const isBiometryAvailable = await LocalAuthentication.hasHardwareAsync();
      if (!isBiometryAvailable) {
        return;
      }
      const enabled = await SecureStore.getItemAsync("biometryEnabled");
      if (enabled) {
        if (Platform.OS === "android") {
          setModalVisible(true);
        }
        const results = await LocalAuthentication.authenticateAsync();
        if (results.success) {
          if (Platform.OS === "android") {
            animationRef.current.play();
          }
          authSuccess();
        } else {
          authFailure();
        }
        sheetRef.current.snapTo(0);
      } else {
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    launchPrompt();
  }, []);
  return modalVisible ? <Biometry animationRef={animationRef} /> : null;
};

export default MFAContainer;
