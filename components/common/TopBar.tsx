import React from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  MaterialTopTabBar,
  MaterialTopTabBarProps
} from "@react-navigation/material-top-tabs";

export const TopBar = (props: MaterialTopTabBarProps) => {
  const { colors } = useTheme();
  return (
    <View collapsable={false}>
      <MaterialTopTabBar
        {...props}
        style={{ backgroundColor: colors.background }}
        activeTintColor={colors.primary}
        inactiveTintColor={colors.text}
        indicatorStyle={{
          backgroundColor: colors.primary
        }}
        labelStyle={{
          fontWeight: "bold"
        }}
      />
    </View>
  );
};
