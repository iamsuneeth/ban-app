import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useTransactionState } from "bank-core";
import { Transaction } from "../components/accounts/transactions/TransactionsSheet";
import BottomSheet from "reanimated-bottom-sheet";
import { SEARCH_TYPE } from "bank-core/dist/types";

type TxnProps = {
  accountId: string;
  sheetRef: React.LegacyRef<BottomSheet>;
};

export const TransactionContainer = ({ accountId, sheetRef }: TxnProps) => {
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

  return (
    <Transaction
      {...{
        loading: transactions.loading,
        sheetRef,
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
