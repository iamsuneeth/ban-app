import React from "react";

import { createStackNavigator, HeaderProps } from "react-navigation-stack";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { HomeContainer } from "../../containers/HomeContainer";
import { AccountDetailsContainer } from "../../containers/AccountDetailsContainer";
import { BorderlessButton } from "react-native-gesture-handler";
import { TransactionContainer } from "../../containers/TransactionContainer";
import { Text } from "react-native";

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
      navigationOptions: ({ navigation }) => ({
        headerTitle: () => (
          <Text
            style={{
              fontWeight: "bold",
              flex: 1,
              textAlign: "center"
            }}
          >
            {navigation.state.params.name}
          </Text>
        ),
        headerRight: (
          <BorderlessButton
            onPress={() =>
              navigation.navigate("Transactions", {
                accountId: navigation.state.params.accountId
              })
            }
          >
            <Ionicons
              name="ios-search"
              size={24}
              color="tomato"
              style={{ paddingRight: 10 }}
            />
          </BorderlessButton>
        )
      })
    },
    Transactions: {
      screen: TransactionContainer,
      navigationOptions: {
        title: "Transactions"
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
