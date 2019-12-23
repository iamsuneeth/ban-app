import React from "react";
import { createStackNavigator } from "react-navigation-stack";

import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { PaymentsOverview } from "../payments/paymentsOverview/PaymentsOverview";
import { Upcoming } from "../payments/upcoming/Upcoming";
import { FuturePayments } from "../payments/upcoming/FuturePayments";
import { MakePayment } from "../payments/transferMoney/MakePayment";
import { ThemeColors } from "../../theme/constants";
import { PayeeContainer } from "../../containers/PayeeContainer";
import { PayeeSearchContainer } from "../../containers/PayeesSearchContainer";

export const PaymentStack = createStackNavigator(
  {
    Overview: createMaterialTopTabNavigator(
      {
        dashboard: {
          screen: PaymentsOverview,
          navigationOptions: {
            title: "Payments"
          }
        },
        upcoming: Upcoming,
        history: () => null
      },
      {
        navigationOptions: {
          title: "Payments"
        },
        tabBarOptions: {
          style: {
            backgroundColor: "#212121"
          },
          indicatorStyle: {
            backgroundColor: "#fff"
          },
          labelStyle: {
            fontWeight: "bold"
          }
        }
      }
    ),
    makePayment: MakePayment,
    payees: {
      screen: PayeeContainer,
      navigationOptions: ({ navigation }) => ({
        headerTitle: props => <PayeeSearchContainer navigation={navigation} />,
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
    },
    futurePayments: {
      screen: FuturePayments,
      navigationOptions: {
        title: "Future payments"
      }
    },
    standingOrders: {
      screen: () => null,
      navigationOptions: {
        title: "Standing instructions"
      }
    },
    directDebits: {
      screen: () => null,
      navigationOptions: {
        title: "Direct debits"
      }
    }
  },
  {
    cardStyle: {
      backgroundColor: "#ffffff"
    },
    defaultNavigationOptions: ({ theme }) => ({
      headerStyle: {
        backgroundColor: "#212121",
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        color: ThemeColors[theme].white
      }
    })
  }
);
