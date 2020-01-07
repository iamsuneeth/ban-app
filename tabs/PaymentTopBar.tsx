import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PaymentsOverview } from "../components/payments/paymentsOverview/PaymentsOverview";
import { Upcoming } from "../components/payments/upcoming/Upcoming";
import { Options } from "../components/more/Options";
import { normalize } from "../utils/normalize";

export type PaymentTopBarParamList = {
  PaymentDashboard: undefined;
  Upcoming: undefined;
  PaymentHistory: undefined;
};

const Tab = createMaterialTopTabNavigator<PaymentTopBarParamList>();
export const PaymentTopBar = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: normalize(14)
        }
      }}
    >
      <Tab.Screen
        name="PaymentDashboard"
        component={PaymentsOverview}
        options={{
          title: "Payments"
        }}
      />
      <Tab.Screen name="Upcoming" component={Upcoming} />
      <Tab.Screen
        name="PaymentHistory"
        component={() => null}
        options={{ title: "History" }}
      />
    </Tab.Navigator>
  );
};

export default PaymentTopBar;
