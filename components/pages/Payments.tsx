import { StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { PaymentsOverview } from "../payments/paymentsOverview/PaymentsOverview";
import { Upcoming } from "../payments/upcoming/Upcoming";
import { FuturePayments } from "../payments/upcoming/FuturePayments";

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
        }
      }
    ),
    makePayment: () => null,
    payees: () => null,
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
    transparentCard: true,
    transitionConfig: (): any => ({
      containerStyle: {
        backgroundColor: "transparent"
      }
    })
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
