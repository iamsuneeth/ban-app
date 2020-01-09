import React from "react";
import { Platform } from "react-native";
import { Switch as RNSwitch } from "react-native-paper";

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const Switch = ({ value, onValueChange }: SwitchProps) => {
  return (
    <RNSwitch
      value={value}
      onValueChange={onValueChange}
      style={{
        transform: [
          { scaleX: Platform.select({ ios: 0.8, android: 1 }) },
          { scaleY: Platform.select({ ios: 0.8, android: 1 }) }
        ]
      }}
    />
  );
};

export default Switch;
