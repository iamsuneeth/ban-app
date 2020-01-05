import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MakePaymentContainer } from "../containers/MakePaymentContainer";
import { PaymentReviewContainer } from "../containers/PaymentReviewContainer";
import { ConfirmScreen } from "../components/payments/transferMoney/ConfirmScreen";
import { PayeeContainer } from "../containers/PayeeContainer";
import { PayeeSearchContainer } from "../containers/PayeesSearchContainer";
import { PayeeDetails } from "../components/payments/payees/PayeeDetails";
import { FuturePayments } from "../components/payments/upcoming/FuturePayments";
import PaymentTopBar from "../tabs/PaymentTopBar";
import { IAccount, IPayee } from "bank-core/src/types";

export type PaymentParamList = {
  PaymentsOverview: undefined;
  PayeeSelectionScreen: { account: IAccount } | undefined;
  AmountScreen: { payee: IPayee } | undefined;
  ReviewScreen: undefined;
  ConfirmScreen: undefined;
  Payees: undefined;
  PayeeDetails: { payee: IPayee };
  AddPayee: undefined;
  FuturePayments: undefined;
  StandingOrders: undefined;
  DirectDebits: undefined;
};

const Stack = createStackNavigator<PaymentParamList>();

export const PaymentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PaymentsOverview"
        component={PaymentTopBar}
        options={{
          headerStyle: {
            borderBottomWidth: 0
          },
          title: "Payments overview"
        }}
      />
      <Stack.Screen
        name="PayeeSelectionScreen"
        component={MakePaymentContainer}
        options={{
          header: () => null
        }}
      />
      <Stack.Screen
        name="AmountScreen"
        component={MakePaymentContainer}
        options={{
          header: () => null
        }}
      />
      <Stack.Screen
        name="ReviewScreen"
        component={PaymentReviewContainer}
        options={{ title: "Review" }}
      />
      <Stack.Screen
        name="ConfirmScreen"
        component={ConfirmScreen}
        options={{
          headerLeft: () => null,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="Payees"
        component={PayeeContainer}
        options={() => ({
          headerTitle: props => <PayeeSearchContainer />,
          headerBackTitleStyle: {
            display: "none"
          },
          headerTitleContainerStyle: {
            width: "80%"
          }
        })}
      />
      <Stack.Screen
        name="PayeeDetails"
        component={PayeeDetails}
        options={{
          title: "Payee details"
        }}
      />
      <Stack.Screen
        name="AddPayee"
        component={() => null}
        options={{
          title: "Add payee"
        }}
      />
      <Stack.Screen
        name="FuturePayments"
        component={FuturePayments}
        options={{
          title: "Future payments"
        }}
      />
      <Stack.Screen
        name="StandingOrders"
        component={() => null}
        options={{
          title: "Standing orders"
        }}
      />
      <Stack.Screen
        name="DirectDebits"
        component={() => null}
        options={{
          title: "Direct debits"
        }}
      />
    </Stack.Navigator>
  );
};
