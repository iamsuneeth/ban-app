import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../../../App";
import { normalize } from "../../../utils/normalize";

export const Seperator = (style?: StyleProp<ViewStyle>) => {
  const { colors } = useTheme() as ThemeType;
  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: colors.seperator,
          marginVertical: normalize(10)
        },
        style
      ]}
    />
  );
};
