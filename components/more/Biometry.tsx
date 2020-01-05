import React, { useEffect } from "react";
import { View, Text, Switch, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { normalize } from "../../utils/normalize";
import { useTheme } from "@react-navigation/native";

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
  const { colors } = useTheme();
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
        <Text style={{ fontSize: normalize(16), color: colors.text }}>
          Enable biometry
        </Text>
        <Switch
          onValueChange={handleBiometry}
          value={biometryEnabled}
          trackColor={{
            false: colors.text,
            true: colors.primary
          }}
        />
      </View>
    </View>
  ) : null;
};
