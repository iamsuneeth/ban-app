import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { FontAwesome } from "@expo/vector-icons";
import { HomeContainer } from "../../containers/HomeContainer";
import { AccountDetailsContainer } from "../../containers/AccountDetailsContainer";

export const HomeStack = createStackNavigator(
  {
    Accounts: {
      screen: HomeContainer,
      navigationOptions: {
        title: "Home",
        headerStyle: {
          backgroundColor: "#f5f5f5",
          elevation: 0
        },
        headerTitleStyle: {
          fontWeight: "bold",
          flex: 1,
          textAlign: "center"
        },
        headerLeft: (
          <FontAwesome
            name="user-circle"
            size={24}
            color="tomato"
            style={{ paddingLeft: 10 }}
          />
        ),
        headerRight: (
          <FontAwesome
            name="user-circle"
            size={24}
            color="tomato"
            style={{ paddingRight: 10 }}
          />
        )
      }
    },
    AccountDetails: {
      screen: AccountDetailsContainer,
      navigationOptions: {
        title: "Account Details"
      }
    }
  },
  {
    initialRouteName: "Accounts",
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: "bold",
        flex: 1,
        textAlign: "center"
      }
    }
  }
);
