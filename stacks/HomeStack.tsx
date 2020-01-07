import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountDetailsContainer } from "../containers/AccountDetailsContainer";
import { HomeContainer } from "../containers/HomeContainer";
import { TransactionContainer } from "../containers/TransactionContainer";
import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { TransactionSearchContainer } from "../containers/TransactionSearchContainer";
import { IAccount } from "bank-core/src/types";
import { useTheme } from "@react-navigation/native";

export type HomeParamList = {
  Accounts: undefined;
  AccountDetails: { account: IAccount };
  Transactions: { accountId: string };
};

const Stack = createStackNavigator<HomeParamList>();
export const HomeStack = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator initialRouteName="Accounts">
      <Stack.Screen
        name="Accounts"
        component={HomeContainer}
        options={{
          headerTitle: null,
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  marginLeft: 10,
                  color: colors.text,
                  fontWeight: "bold"
                }}
              >
                BitBank
              </Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <FontAwesome
                name="bell-o"
                size={23}
                color={colors.text}
                style={{ paddingRight: 10 }}
              />
              <MaterialIcons
                name="settings"
                size={25}
                color={colors.text}
                style={{ paddingRight: 10 }}
              />
              <FontAwesome
                name="user-circle"
                size={25}
                color={colors.text}
                style={{ paddingRight: 10 }}
              />
            </View>
          ),
          headerStyle: {
            borderBottomWidth: 0
          }
        }}
      />
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetailsContainer}
        options={({ route }) => ({
          title: route.params?.account.nickName,
          headerTitleStyle: {
            fontWeight: "bold",
            flex: 1,
            textAlign: "center"
          }
        })}
      />
      <Stack.Screen
        name="Transactions"
        component={TransactionContainer}
        options={({ route }) => ({
          headerTitle: props => <TransactionSearchContainer route={route} />,
          headerBackTitleStyle: {
            display: "none"
          },
          headerTitleContainerStyle: {
            width: "80%"
          }
        })}
      />
    </Stack.Navigator>
  );
};
