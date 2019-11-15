import React from "react";
import { View } from "react-native";
import { BottomTabBar } from "react-navigation-tabs";
import { BottomTabBarProps } from "react-navigation-tabs/lib/typescript/src/types";

let tabBarLayout = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};

export const TabBarHeight = tabBarLayout.height;

export const TabBar = (props: BottomTabBarProps) => {
  return (
    <View
      collapsable={false}
      onLayout={event => {
        tabBarLayout = event.nativeEvent.layout;
      }}
    >
      <BottomTabBar {...props} />
    </View>
  );
};
