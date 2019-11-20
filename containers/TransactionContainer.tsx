import React, { useEffect } from "react";
import { useTransactionState } from "bank-core";
import { TransactionSheet } from "../components/accounts/transactions/TransactionsSheet";
import BottomSheet from "reanimated-bottom-sheet";
import { SEARCH_TYPE } from "bank-core/dist/types";
import { NavigationStackProp } from "react-navigation-stack";
import { Transaction } from "../components/accounts/transactions/Transactions";

type TxnProps = {
  accountId: string;
  sheetRef: React.LegacyRef<BottomSheet>;
};

export const TransactionContainer = (
  props:
    | TxnProps
    | {
        navigation: NavigationStackProp<{}>;
      }
) => {
  let { accountId, sheetRef } = props as TxnProps;
  let isChild = true;
  if (!accountId) {
    isChild = false;
    const { navigation } = props as { navigation: NavigationStackProp<{}> };
    accountId = navigation.state.params.accountId;
  }
  const {
    transactions = {
      loading: false,
      items: []
    },
    account,
    fetchTransactions,
    filterTransaction,
    clearFilters
  } = useTransactionState(accountId);

  useEffect(() => {
    fetchTransactions({
      type: SEARCH_TYPE.DEFAULT,
      accountOpenDate: account.openingDate
    });
  }, []);

  return isChild ? (
    <TransactionSheet
      {...{
        loading: transactions.loading,
        sheetRef,
        accountId,
        account,
        transactions: transactions.items
      }}
    />
  ) : (
    <Transaction
      {...{
        loading: transactions.loading,
        accountId,
        account,
        transactions: transactions.items,
        fetchTransactions,
        filterTransaction,
        clearFilters
      }}
    />
  );
};
