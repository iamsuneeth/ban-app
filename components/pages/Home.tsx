import React from "react";

import { createStackNavigator } from "react-navigation-stack";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { HomeContainer } from "../../containers/HomeContainer";
import { AccountDetailsContainer } from "../../containers/AccountDetailsContainer";
import { BorderlessButton } from "react-native-gesture-handler";
import { TransactionContainer } from "../../containers/TransactionContainer";
import { SearchContainer } from "../../containers/SearchContainer";
import { View, Text } from "react-native";
import { normalize } from "../../utils/normalize";

export const HomeStack = createStackNavigator(
  {
    Accounts: {
      screen: HomeContainer,
      navigationOptions: {
        headerLeft: (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Ionicons
              name="logo-bitcoin"
              size={30}
              style={{ paddingLeft: 10 }}
            />
            <Text
              style={{
                fontSize: normalize(30),
                marginLeft: 5,
                fontWeight: "bold"
              }}
            >
              BitBank
            </Text>
          </View>
        ),
        headerRight: (
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="bell-o" size={23} style={{ paddingRight: 10 }} />
            <MaterialIcons
              name="settings"
              size={25}
              style={{ paddingRight: 10 }}
            />
            <FontAwesome
              name="user-circle"
              size={25}
              style={{ paddingRight: 10 }}
            />
          </View>
        ),
        headerStyle: {
          borderBottomWidth: 0
        }
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
      navigationOptions: ({ navigation }) => ({
        headerTitle: props => <SearchContainer navigation={navigation} />,
        headerStyle: {
          backgroundColor: "#fff"
        },
        headerBackTitleStyle: {
          display: "none"
        },
        headerTitleContainerStyle: {
          right: 0,
          paddingRight: 5
        },
        headerRight: null
      })
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
