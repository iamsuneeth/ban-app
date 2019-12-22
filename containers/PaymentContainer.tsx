import React, { useState } from "react";
import { useFavoriteState } from "bank-core";
import { Favorites } from "../components/payments/paymentsOverview/Favorites";
import { PaymentsOverview } from "../components/payments/paymentsOverview/PaymentsOverview";

export const PaymentContainer = ({ navigation }) => {
  return <PaymentsOverview navigation={navigation} />;
};
