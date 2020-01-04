import React, { useEffect } from "react";
import { useTransactionState } from "bank-core";
import { TransactionSheet } from "../components/accounts/transactions/TransactionsSheet";
import BottomSheet from "reanimated-bottom-sheet";
import { SEARCH_TYPE } from "bank-core/src/types";
import { Transaction } from "../components/accounts/transactions/Transactions";
import { RouteProp } from "@react-navigation/native";
import { HomeParamList } from "../stacks/HomeStack";

type TxnComponentType = "mini" | "sheet" | "full";

type TxnProps = {
  accountId: string;
  height?: number;
  type?: TxnComponentType;
};

type TransactionRouteProp = RouteProp<HomeParamList, "Transactions">;

export const TransactionContainer = (
  props:
    | TxnProps
    | {
        route: TransactionRouteProp;
      }
) => {
  let { accountId, height, type } = props as TxnProps;
  let isChild = true;
  if (!accountId) {
    isChild = false;
    const { route } = props as { route: TransactionRouteProp };
    accountId = route.params?.accountId;
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
      type: SEARCH_TYPE.DEFAULT
    });
  }, [account]);
  let ComponentToRender = null;
  switch (type) {
    case "sheet":
      ComponentToRender = (
        <TransactionSheet
          {...{
            loading: transactions.loading,
            accountId,
            account,
            height,
            transactions: transactions.allItems
          }}
        />
      );
      break;
    case "mini":
    default:
      ComponentToRender = (
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
            clearFilters,
            type
          }}
        />
      );
  }

  return ComponentToRender;
};
