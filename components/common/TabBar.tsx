import React from "react";
import { View } from "react-native";
import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import { normalize } from "../../utils/normalize";

let tabBarLayout = {
  x: 0,
  y: 0,
  width: normalize(0),
  height: normalize(0)
};

export const getTabBarHeight = () => tabBarLayout.height;

export const TabBar = (props: BottomTabBarProps) => {
  const { colors } = useTheme();
  return (
    <View
      collapsable={false}
      onLayout={event => {
        tabBarLayout = event.nativeEvent.layout;
      }}
    >
      <BottomTabBar {...props} activeTintColor={colors.primary} />
    </View>
  );
};
