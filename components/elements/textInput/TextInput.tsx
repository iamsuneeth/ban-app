import React from "react";
import { View, Text } from "react-native";
import { TextInput as RNTextInput } from "react-native-paper";
import { normalize } from "../../../utils/normalize";

export const TextInput = ({ style, ...props }) => {
  return (
    <RNTextInput
      theme={{
        colors: {
          background: "transparent"
        }
      }}
      autoCorrect={false}
      style={{
        marginVertical: 10,
        width: "100%",
        ...style
      }}
      {...props}
    />
  );
};
