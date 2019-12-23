import React from "react";
import { View, Text } from "react-native";
import { usePayeeState } from "bank-core";
import { RecentPayees } from "../components/payments/payees/RecentPayees";
import { Payees } from "../components/payments/payees/Payees";

type props = {
  type: "recent" | "all";
};

export const PayeeContainer = ({ type }: props) => {
  const { payees, filterPayees, filteredPayees } = usePayeeState();
  return type === "recent" ? (
    <RecentPayees payees={payees} />
  ) : (
    <Payees
      payees={filteredPayees}
      loading={payees.loading}
      filterPayees={filterPayees}
    />
  );
};
