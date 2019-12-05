import { StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation-stack";

import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { PaymentsOverview } from "../payments/paymentsOverview/PaymentsOverview";

export const PaymentStack = createStackNavigator({
  Overview: createMaterialTopTabNavigator(
    {
      dashboard: {
        screen: PaymentsOverview,
        navigationOptions: {
          title: "Payments"
        }
      },
      upcoming: () => null,
      history: () => null
    },
    {
      navigationOptions: {
        title: "Payments"
      }
    }
  ),
  makePayment: () => null,
  payees: () => null
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
