import React from "react";
import { StyleSheet, View } from "react-native";
import {
  createStackNavigator,
  NavigationStackProp
} from "react-navigation-stack";
import { AccountDetails } from "../accounts/account-details/AccountDetails";
import { FontAwesome } from "@expo/vector-icons";
import { AccountList } from "../accounts/account-list/AccountList";
import { AccountSummary } from "../accounts/account-sumary/AccountSummary";

type Props = {
  navigation: NavigationStackProp<{}>;
};
export const Home = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <AccountSummary />
      <AccountList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center"
  }
});

export const HomeStack = createStackNavigator(
  {
    Accounts: {
      screen: Home,
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
      screen: AccountDetails,
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
