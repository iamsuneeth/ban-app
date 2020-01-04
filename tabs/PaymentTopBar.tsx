import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PaymentsOverview } from "../components/payments/paymentsOverview/PaymentsOverview";
import { Upcoming } from "../components/payments/upcoming/Upcoming";

export type PaymentTopBarParamList = {
  PaymentDashboard: undefined;
  Upcoming: undefined;
  PaymentHistory: undefined;
};

const Tab = createMaterialTopTabNavigator<PaymentTopBarParamList>();
export const PaymentTopBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="PaymentDashboard" component={PaymentsOverview} />
      <Tab.Screen name="Upcoming" component={Upcoming} />
      <Tab.Screen name="PaymentHistory" component={() => null} />
    </Tab.Navigator>
  );
};

export default PaymentTopBar;
