import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { usePayeeState } from "bank-core";
import { RecentPayees } from "../components/payments/payees/RecentPayees";
import { Payees } from "../components/payments/payees/Payees";
import { FrequentPayees } from "../components/payments/payees/FrequentPayees";
import { IPayee } from "bank-core/src/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentParamList } from "../stacks/PaymentStack";

type props = {
  type?: "recent" | "frequent" | "all";
  complyFilter?: boolean;
  useFlatList?: boolean;
  onPress?: (payee: IPayee) => void;
  navigation?: StackNavigationProp<PaymentParamList, "Payees">;
};

export const PayeeContainer = ({
  type,
  complyFilter = false,
  useFlatList = true,
  onPress
}: props) => {
  const { payees, filterPayees, filteredPayees, fetchPayees } = usePayeeState();
  useEffect(() => {
    fetchPayees();
  }, []);
  let ComponentToRender = null;
  switch (type) {
    case "recent":
      ComponentToRender = (
        <RecentPayees
          payees={complyFilter ? filteredPayees : payees.payees}
          loading={payees.loading}
          onPress={onPress}
        />
      );
      break;
    case "frequent":
      ComponentToRender = (
        <FrequentPayees
          payees={complyFilter ? filteredPayees : payees.payees}
          loading={payees.loading}
          onPress={onPress}
        />
      );
      break;
    default:
      ComponentToRender = (
        <Payees
          payees={filteredPayees}
          loading={payees.loading}
          filterPayees={filterPayees}
          useFlatList={useFlatList}
          onPress={onPress}
        />
      );
  }
  return ComponentToRender;
};
