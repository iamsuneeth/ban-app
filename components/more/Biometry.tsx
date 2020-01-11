import React, { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import Switch from "../elements/switch/Switch";
import { Row } from "../elements/view/Row";
import { Card } from "../elements/card/Card";
import { Text } from "../elements/text/Text";
import { ListContainer } from "../elements/list/ListContainer";
import { List } from "react-native-paper";

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
    } else {
      await SecureStore.deleteItemAsync("biometryEnabled");
      setBiometryEnabled(false);
    }
  };
  return initialized ? (
    <ListContainer>
      <List.Item
        title="Enable biometry"
        right={() => (
          <Switch onValueChange={handleBiometry} value={biometryEnabled} />
        )}
      />
    </ListContainer>
  ) : null;
};
