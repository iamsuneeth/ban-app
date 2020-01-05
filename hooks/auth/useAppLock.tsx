import { useEffect } from "react";
import { AppState, AppStateStatus, Keyboard } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

export const useAppLock = () => {
  const navigation = useNavigation();
  const handleStateChange = async (state: AppStateStatus) => {
    if (state === "active") {
      const enabled = await SecureStore.getItemAsync("biometryEnabled");
      if (enabled) {
        navigation.navigate("AuthModal");
      }
    } else {
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
