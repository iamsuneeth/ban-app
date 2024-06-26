import React, { useCallback } from "react";
import { usePayeeState } from "bank-core";
import { StackNavigationProp } from "@react-navigation/stack";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { PayeeSearch } from "../components/payments/payees/payeeSearch";
import { PaymentParamList } from "../stacks/PaymentStack";

export const PayeeSearchContainer = () => {
  const { filterPayees, payees } = usePayeeState();
  const handleSearch = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    filterPayees({
      searchString: event.nativeEvent.text
    });
  };

  return (
    <PayeeSearch
      handleSearch={handleSearch}
      searchString={payees.filters.searchString}
    />
  );
};
