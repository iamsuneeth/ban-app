import React from "react";
import { TransactionSearch } from "../components/accounts/transactions/TransactionSearch";
import { useTransactionState } from "bank-core";
import { NavigationStackProp } from "react-navigation-stack";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export const TransactionSearchContainer = ({
  navigation
}: {
  navigation: NavigationStackProp<{}>;
}) => {
  const { filterTransaction, transactions } = useTransactionState(
    navigation.state.params.accountId
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
