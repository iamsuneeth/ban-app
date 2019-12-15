import React from "react";
import { View } from "react-native";
import { BottomTabBar } from "react-navigation-tabs";
import { BottomTabBarProps } from "react-navigation-tabs/lib/typescript/src/types";
import { ThemeColors } from "../../theme/constants";
import { useTheme } from "react-navigation";

let tabBarLayout = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};

export const getTabBarHeight = () => tabBarLayout.height;

export const TabBar = (props: BottomTabBarProps) => {
  const themeColors = ThemeColors[useTheme()];
  return (
    <View
      collapsable={false}
      onLayout={event => {
        tabBarLayout = event.nativeEvent.layout;
      }}
    >
      <BottomTabBar
        {...props}
        activeTintColor={themeColors.primary}
        inactiveTintColor={themeColors.gray}
      />
    </View>
  );
};
