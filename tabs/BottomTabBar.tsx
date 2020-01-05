import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStack } from "../stacks/HomeStack";

import { PaymentStack } from "../stacks/PaymentStack";
import { MoreStack } from "../stacks/MoreStack";
import { StatisticsStack } from "../stacks/StatisticsStack";
import { Ionicons, MaterialIcons, Foundation } from "@expo/vector-icons";

export type BottomTabParamList = {
  Home: undefined;
  Payment: undefined;
  Stats: undefined;
  More: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabBarStack = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ size, color }) => (
          <Ionicons name="ios-home" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="Payment"
      component={PaymentStack}
      options={{
        tabBarLabel: "Payment",
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="payment" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="Stats"
      component={StatisticsStack}
      options={{
        tabBarLabel: "Statistics",
        tabBarIcon: ({ size, color }) => (
          <Foundation name="graph-bar" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="More"
      component={MoreStack}
      options={{
        tabBarLabel: "More",
        tabBarIcon: ({ size, color }) => (
          <Ionicons name="ios-more" color={color} size={size} />
        )
      }}
    />
  </Tab.Navigator>
);
