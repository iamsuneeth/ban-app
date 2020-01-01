import React, { useEffect } from "react";
import { usePayeeState, usePaymentState } from "bank-core";
import { PayeeSelectionScreen } from "../components/payments/transferMoney/PayeeSelectionScreen";
import { NavigationStackProp } from "react-navigation-stack";
import { AmountScreen } from "../components/payments/transferMoney/AmountScreen";
import { MakePaymentHeader } from "../components/payments/transferMoney/MakePaymentHeader";
import { IAccount } from "bank-core/typescript/types";

type Props = {
  navigation: NavigationStackProp;
};

export const MakePaymentContainer = ({ navigation }: Props) => {
  const screen = navigation.state.routeName;

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
    if (navigation.state.routeName === "payeeSelectionScreen") {
      clearPaymentState();
    }
    const account = navigation.getParam("account");
    if (account) {
      updatePaymentState({
        account
      });
    }
  }, []);
  switch (screen) {
    case "payeeSelectionScreen":
      ComponentToRender = (
        <PayeeSelectionScreen
          navigation={navigation}
          updatePaymentState={updatePaymentState}
        />
      );
      break;
    case "amountScreen":
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

MakePaymentContainer.sharedElements = (
  navigation: NavigationStackProp<{}>,
  otherNavigation,
  showing
) => {
  return navigation.state.params &&
    otherNavigation.state.routeName !== "reviewScreen"
    ? [
        {
          id: navigation.state.params.payeeId,
          animation: "fade"
        },
        {
          id: "title",
          animation: "fade"
        }
      ]
    : [];
};
