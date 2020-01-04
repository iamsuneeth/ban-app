import React, { useEffect } from "react";
import { usePayeeState, usePaymentState } from "bank-core";
import { PayeeSelectionScreen } from "../components/payments/transferMoney/PayeeSelectionScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { AmountScreen } from "../components/payments/transferMoney/AmountScreen";
import { MakePaymentHeader } from "../components/payments/transferMoney/MakePaymentHeader";
import { IAccount } from "bank-core/typescript/types";
import { PaymentParamList } from "../stacks/PaymentStack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../tabs/BottomTabBar";

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<
      PaymentParamList,
      "PayeeSelectionScreen" | "AmountScreen"
    >,
    BottomTabNavigationProp<BottomTabParamList>
  >;
  route: RouteProp<PaymentParamList, "PayeeSelectionScreen" | "AmountScreen">;
};

export const MakePaymentContainer = ({ navigation, route }: Props) => {
  let ComponentToRender = null;
  const { filterPayees, payees } = usePayeeState();
  const {
    paymentState,
    updatePaymentState,
    clearPaymentState
  } = usePaymentState();
  const updateAccount = (account: IAccount) => {
    updatePaymentState({
      account
    });
  };
  useEffect(() => {
    if (route.name === "PayeeSelectionScreen") {
      clearPaymentState();
    }
    const account = route.params?.account;
    if (account) {
      updatePaymentState({
        account
      });
    }
  }, []);
  switch (route.name) {
    case "PayeeSelectionScreen":
      ComponentToRender = (
        <PayeeSelectionScreen
          navigation={navigation}
          updatePaymentState={updatePaymentState}
        />
      );
      break;
    case "AmountScreen":
      ComponentToRender = (
        <AmountScreen
          navigation={navigation}
          paymentState={paymentState}
          updatePaymentState={updatePaymentState}
          onAccountSelection={updateAccount}
        />
      );
      break;
  }

  return (
    <>
      <MakePaymentHeader
        navigation={navigation}
        filterPayees={filterPayees}
        filters={payees.filters}
        paymentState={paymentState}
        clearPaymentState={clearPaymentState}
        onAccountSelection={updateAccount}
      />
      {ComponentToRender}
    </>
  );
};

// MakePaymentContainer.sharedElements = (
//   navigation: NavigationStackProp<{}>,
//   otherNavigation,
//   showing
// ) => {
//   return navigation.state.params &&
//     otherNavigation.state.routeName !== "reviewScreen"
//     ? [
//         {
//           id: navigation.state.params.payeeId,
//           animation: "fade"
//         },
//         {
//           id: "title",
//           animation: "fade"
//         }
//       ]
//     : [];
// };
