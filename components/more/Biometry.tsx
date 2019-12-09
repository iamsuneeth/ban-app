import React, { useEffect } from "react";
import { View, Text, Switch, Alert } from "react-native";
import { FirebaseClient as firebase } from "bank-core";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";

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
  return initialized ? (
    <View>
      <Text>Enable biometry</Text>
      <Switch onValueChange={handleBiometry} value={biometryEnabled} />
    </View>
  ) : null;
};
