import React from "react";

import { createStackNavigator, HeaderProps } from "react-navigation-stack";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { HomeContainer } from "../../containers/HomeContainer";
import { AccountDetailsContainer } from "../../containers/AccountDetailsContainer";
import { BorderlessButton, TextInput } from "react-native-gesture-handler";
import { TransactionContainer } from "../../containers/TransactionContainer";
import { Text, View, Platform } from "react-native";

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
        title: navigation.state.params.name,
        headerTitleStyle: {
          fontWeight: "bold",
          flex: 1,
          textAlign: "center"
        },
        headerStyle: {
          backgroundColor: "#f5f5f5",
          elevation: 0
        },
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
        headerTitle: props => (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TextInput
              placeholder={"Search"}
              clearButtonMode={"always"}
              selectionColor={"tomato"}
              style={{
                padding: 10,
                flex: 1
              }}
            />
            {Platform.OS === "android" && (
              <Ionicons
                name="ios-close-circle"
                size={20}
                style={{ position: "absolute", right: 0, alignSelf: "center" }}
              />
            )}
          </View>
        ),
        headerBackTitleStyle: {
          display: "none"
        },
        headerTitleContainerStyle: {
          right: 0,
          paddingRight: 5
        },
        headerRight: null
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
