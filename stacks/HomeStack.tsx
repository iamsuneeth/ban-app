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
import { normalize } from "../utils/normalize";

export type HomeParamList = {
  Accounts: undefined;
  AccountDetails: { account: IAccount };
  Transactions: { accountId: string };
};

const Stack = createStackNavigator<HomeParamList>();
export const HomeStack = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Accounts"
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
          borderBottomWidth: 0
        },
        headerTitleStyle: {
          fontWeight: "bold"
        }
      }}
    >
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
                  fontSize: normalize(30),
                  marginLeft: normalize(10),
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
                style={{ paddingRight: normalize(10) }}
              />
              <MaterialIcons
                name="settings"
                size={25}
                color={colors.text}
                style={{ paddingRight: normalize(10) }}
              />
              <FontAwesome
                name="user-circle"
                size={25}
                color={colors.text}
                style={{ paddingRight: normalize(10) }}
              />
            </View>
          )
        }}
      />
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetailsContainer}
        options={({ route }) => ({
          title: route.params?.account.nickName
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
