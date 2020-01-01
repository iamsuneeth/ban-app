import React, { useEffect } from "react";
import { View, Text, Switch, Alert } from "react-native";
import * as firebase from "firebase";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { normalize } from "../../utils/normalize";
import { useTheme } from "react-navigation";
import { ThemeColors } from "../../theme/constants";

export const Biometry = () => {
  const [biometryEnabled, setBiometryEnabled] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const initialize = async () => {
    const biometryEnabled = await SecureStore.getItemAsync("biometryEnabled");
    setBiometryEnabled(!!biometryEnabled);
    setInitialized(true);
  };
  useEffect(() => {
    initialize();
  }, []);
  const handleBiometry = async (value: boolean) => {
    if (value) {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      await SecureStore.setItemAsync("biometryEnabled", "true");
      setBiometryEnabled(true);
      Alert.alert("Biomerty Enabled");
    } else {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
      await SecureStore.deleteItemAsync("biometryEnabled");
      setBiometryEnabled(false);
      Alert.alert("Biomerty Disabled");
    }
  };
  const themeColors = ThemeColors[useTheme()];
  return initialized ? (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          margin: 10
        }}
      >
        <Text style={{ fontSize: normalize(16) }}>Enable biometry</Text>
        <Switch
          onValueChange={handleBiometry}
          value={biometryEnabled}
          trackColor={{
            false: themeColors.gray,
            true: themeColors.primary
          }}
        />
      </View>
    </View>
  ) : null;
};
