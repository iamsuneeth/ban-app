import React, { useEffect } from "react";
import { usePaymentState, useAuthState } from "bank-core";
import { ReviewScreen } from "../components/payments/transferMoney/ReviewScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { PaymentParamList } from "../stacks/PaymentStack";
import { BottomTabParamList } from "../tabs/BottomTabBar";

type navigationPropType = CompositeNavigationProp<
  StackNavigationProp<PaymentParamList, "ReviewScreen">,
  BottomTabNavigationProp<BottomTabParamList>
>;

type props = {
  navigation: navigationPropType;
};
export const PaymentReviewContainer = ({ navigation }: props) => {
  const { paymentState, initiatePayment } = usePaymentState();
  const { authState } = useAuthState();
  useEffect(() => {
    if (authState.authRequired) {
      navigation.navigate("Modal", {
        type: "auth"
      });
    }
  }, [authState.authRequired]);
  useEffect(() => {
    if (paymentState.completed) {
      navigation.replace("confirmationScreen", {});
    }
  }, [paymentState.completed]);
  return (
    <ReviewScreen
      paymentState={paymentState}
      initiatePayment={initiatePayment}
    />
  );
};
