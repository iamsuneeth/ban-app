import React, { useEffect } from "react";
import { useTransactionState } from "bank-core";
import { TransactionSheet } from "../components/accounts/transactions/TransactionsSheet";
import BottomSheet from "reanimated-bottom-sheet";
import { SEARCH_TYPE } from "bank-core/dist/types";
import { NavigationStackProp } from "react-navigation-stack";
import { Transaction } from "../components/accounts/transactions/Transactions";

type TxnProps = {
  accountId: string;
  height: number;
};

export const TransactionContainer = (
  props:
    | TxnProps
    | {
        navigation: NavigationStackProp<{}>;
      }
) => {
  let { accountId, height } = props as TxnProps;
  let isChild = true;
  if (!accountId) {
    isChild = false;
    const { navigation } = props as { navigation: NavigationStackProp<{}> };
    accountId = navigation.state.params.accountId;
  }
  const {
    transactions = {
      loading: false,
      refreshing: false,
      items: [],
      allItems: [],
      lastFetched: undefined
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
        accountId,
        account,
        height,
        transactions: transactions.allItems
      }}
    />
  ) : (
    <Transaction
      {...{
        loading: transactions.loading,
        refreshing: transactions.refreshing,
        accountId,
        account,
        transactions: transactions.items,
        lastFetched: transactions.lastFetched,
        fetchTransactions,
        filterTransaction,
        clearFilters
      }}
    />
  );
};
