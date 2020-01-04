import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStack } from "../stacks/HomeStack";

import { PaymentStack } from "../stacks/PaymentStack";
import { MoreStack } from "../stacks/MoreStack";
import { StatisticsStack } from "../stacks/StatisticsStack";

export type BottomTabParamList = {
  Home: undefined;
  Payment: undefined;
  Stats: undefined;
  More: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabBarStack = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Payment" component={PaymentStack} />
    <Tab.Screen name="Stats" component={StatisticsStack} />
    <Tab.Screen name="More" component={MoreStack} />
  </Tab.Navigator>
);
