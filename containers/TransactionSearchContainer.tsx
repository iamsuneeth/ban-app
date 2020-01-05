import React from "react";
import { TransactionSearch } from "../components/accounts/transactions/TransactionSearch";
import { useTransactionState } from "bank-core";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

import { HomeParamList } from "../stacks/HomeStack";
import { RouteProp } from "@react-navigation/native";

export const TransactionSearchContainer = ({
  route
}: {
  route: RouteProp<HomeParamList, "Transactions">;
}) => {
  const { filterTransaction, transactions } = useTransactionState(
    route.params.accountId
  );

  const handleSearch = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    filterTransaction({
      searchString: event.nativeEvent.text
    });
  };

  const searchString =
    transactions && transactions.filters
      ? transactions.filters.searchString
      : "";

  return (
    <TransactionSearch
      handleSearch={handleSearch}
      searchString={searchString}
    />
  );
};
