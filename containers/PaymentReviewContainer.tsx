import React, { useEffect } from "react";
import { usePaymentState, useAuthState } from "bank-core";
import { ReviewScreen } from "../components/payments/transferMoney/ReviewScreen";
import { NavigationStackProp } from "react-navigation-stack";
import { StackActions } from "react-navigation";

type props = {
  navigation: NavigationStackProp;
};
export const PaymentReviewContainer = ({ navigation }: props) => {
  const { paymentState, initiatePayment } = usePaymentState();
  const { authState } = useAuthState();
  useEffect(() => {
    if (authState.authRequired) {
      navigation.navigate("modal", {
        type: "auth"
      });
    }
  }, [authState.authRequired]);
  useEffect(() => {
    if (paymentState.completed) {
      navigation.replace("confirmationScreen");
    }
  }, [paymentState.completed]);
  return (
    <ReviewScreen
      paymentState={paymentState}
      initiatePayment={initiatePayment}
    />
  );
};
