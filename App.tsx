import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { HomeStack } from "./components/pages/Home";
import { Payments } from "./components/pages/Payments";
import { Transfers } from "./components/pages/Transfers";
import { More } from "./components/pages/More";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TabBar } from "./components/common/TabBar";
import { createProvider } from "bank-core";

const BottomTabBar = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" color={tintColor} size={24} />
        )
      }
    },
    Payments: {
      screen: Payments,
      navigationOptions: {
        tabBarLabel: "Payments",
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="payment" color={tintColor} size={24} />
        )
      }
    },
    Transfers: {
      screen: Transfers,
      navigationOptions: {
        tabBarLabel: "Transfers",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-cash" color={tintColor} size={24} />
        )
      }
    },
    More: {
      screen: More,
      navigationOptions: {
        tabBarLabel: "More",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-more" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    },
    tabBarComponent: props => <TabBar {...props} />
  }
);

const Container = createAppContainer(BottomTabBar);

export default () => createProvider(Container);
