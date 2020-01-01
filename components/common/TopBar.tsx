import React from "react";
import { View } from "react-native";
import { ThemeColors } from "../../theme/constants";
import { useTheme, ThemeColors as RNThemeColors } from "react-navigation";
import { MaterialTabBarProps } from "react-navigation-tabs/lib/typescript/src/types";
import { MaterialTopTabBar } from "react-navigation-tabs";

export const TopBar = (props: MaterialTabBarProps) => {
  const themeColors = ThemeColors[useTheme()];
  return (
    <View collapsable={false}>
      <MaterialTopTabBar
        {...props}
        style={{ backgroundColor: RNThemeColors[useTheme()].header }}
        activeTintColor={themeColors.primary}
        inactiveTintColor={themeColors.gray}
        indicatorStyle={{
          backgroundColor: themeColors.primary
        }}
        labelStyle={{
          fontWeight: "bold"
        }}
      />
    </View>
  );
};
