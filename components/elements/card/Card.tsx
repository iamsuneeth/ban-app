import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { normalize } from "../../../utils/normalize";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../../../App";

export const Card: React.FC<ViewProps> = ({ children, style, ...rest }) => {
  const { colors } = useTheme() as ThemeType;
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surface, shadowColor: colors.shadowColor },
        style
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: normalize(10),
    shadowOffset: {
      width: normalize(0),
      height: normalize(3, "height")
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 2
  }
});
