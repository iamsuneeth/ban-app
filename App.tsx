import React from "react";
import "./config/firebase";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { initExtConfig } from "bank-core";
import { ExtInterfaceType } from "bank-core/src/types";
import { HomeStack } from "./components/pages/Home";
import { PaymentStack } from "./components/pages/Payments";
import { Transfers } from "./components/pages/Transfers";
import { MoreStack } from "./components/pages/More";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TabBar } from "./components/common/TabBar";
import { createStackNavigator } from "react-navigation-stack";
import { LoginContainer } from "./containers/LoginContainer";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";

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
      screen: PaymentStack,
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
      screen: MoreStack,
      navigationOptions: {
        tabBarLabel: "More",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-more" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    tabBarComponent: props => <TabBar {...props} />
  }
);

const RootNavigator = createSwitchNavigator(
  {
    preLogin: createStackNavigator(
      {
        login: LoginContainer,
        signUp: () => null,
        reset: () => null
      },
      {
        defaultNavigationOptions: {
          header: null
        },
        transparentCard: true,

        transitionConfig: (): any => ({
          containerStyle: {
            backgroundColor: "transparent"
          }
        })
      }
    ),
    postLogin: BottomTabBar
  },
  {
    initialRouteName: "preLogin"
  }
);

const Container = createAppContainer(RootNavigator);

const provider = initExtConfig({
  API_URL: "",
  interfaceId: ExtInterfaceType.FIREBASE
});

export default () => {
  const theme = useColorScheme();
  return (
    <AppearanceProvider>
      {provider.createProvider(Container, { theme })}
    </AppearanceProvider>
  );
};
