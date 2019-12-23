import React, { useCallback } from "react";
import { usePayeeState } from "bank-core";
import { NavigationStackProp } from "react-navigation-stack";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { PayeeSearch } from "../components/payments/payees/payeeSearch";
import { debounce } from "lodash";
export const PayeeSearchContainer = ({
  navigation
}: {
  navigation: NavigationStackProp<{}>;
}) => {
  const { filterPayees, payees } = usePayeeState();
  const debouncedSearch = useCallback(debounce(filterPayees, 500), []);
  const handleSearch = (text: string) => {
    debouncedSearch({
      searchString: text
    });
    // filterPayees({
    //   searchString: text
    // });
  };

  return (
    <PayeeSearch
      handleSearch={handleSearch}
      searchString={payees.filters.searchString}
    />
  );
};
