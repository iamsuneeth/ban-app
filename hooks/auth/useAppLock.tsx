import { useEffect, useRef } from "react";
import { AppState, AppStateStatus, Keyboard, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

export const useAppLock = () => {
  const navigation = useNavigation();
  const stateRef = useRef<AppStateStatus>();
  const handleStateChange = async (state: AppStateStatus) => {
    if (state === "active" && stateRef.current === "background") {
      stateRef.current = state;
      const enabled = await SecureStore.getItemAsync("biometryEnabled");
      if (enabled) {
        navigation.navigate("AuthModal");
      }
    } else if (state === "background") {
      stateRef.current = state;
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    let isEnabled;
    const check = async () => {
      isEnabled = await SecureStore.getItemAsync("biometryEnabled");
      AppState.addEventListener("change", handleStateChange);
    };
    check();
    return () => {
      if (isEnabled) {
        AppState.removeEventListener("change", handleStateChange);
      }
    };
  }, []);
};
