import React, { useEffect } from "react";
import { View, Text, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../../App";

import { Switch } from "react-native-paper";

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
      await SecureStore.setItemAsync("biometryEnabled", "true");
      setBiometryEnabled(true);
      Alert.alert("Biomerty Enabled");
    } else {
      await SecureStore.deleteItemAsync("biometryEnabled");
      setBiometryEnabled(false);
      Alert.alert("Biomerty Disabled");
    }
  };
  const { colors } = useTheme() as ThemeType;
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
        <Text style={{ fontSize: 16, color: colors.text }}>
          Enable biometry
        </Text>
        <Switch onValueChange={handleBiometry} value={biometryEnabled} />
      </View>
    </View>
  ) : null;
};
