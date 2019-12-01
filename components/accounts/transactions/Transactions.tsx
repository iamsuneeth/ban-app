import React, {
  memo,
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
  useReducer
} from "react";
import {
  SectionList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  GestureResponderEvent,
  Switch
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { TxnHeader } from "./TxnHeader";
import { TxnItem } from "./TxnItem";
import { ITransaction, IAccount, TransactionType } from "bank-core/dist/types";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TransactionFilter } from "./TransactionFilter";

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

type Props = {
  loading: boolean;
  transactions: ITransaction[];
  account: IAccount;
  lastFetched?: string;
  fetchTransactions: Function;
  filterTransaction: Function;
  clearFilters: Function;
};

interface ITransactionUIState {
  startDate: string;
  endDate: string;
}

export const Transaction = memo(
  ({
    transactions,
    account,
    loading,
    fetchTransactions,
    filterTransaction,
    clearFilters,
    lastFetched
  }: Props) => {
    const [state, setState]: [
      ITransactionUIState,
      React.Dispatch<any>
    ] = useReducer((oldState, newState) => ({ ...oldState, ...newState }), {
      endDate: dayjs().format("DD/MM/YYYY"),
      startDate: lastFetched
        ? lastFetched
        : dayjs()
            .subtract(1, "month")
            .format("DD/MM/YYYY")
    });
    let groupedTransactions: { [key: string]: any } = {};
    transactions.forEach(txn => {
      if (!(txn.date in groupedTransactions)) {
        groupedTransactions[txn.date] = [];
      }
      groupedTransactions[txn.date].push(txn);
    });

    const handleApplyFilter = ({
      txnTypes,
      fromAmount,
      toAmount,
      startDate,
      endDate
    }) => {
      filterTransaction({
        txnTypes,
        fromAmount,
        toAmount,
        startDate,
        endDate
      });
      setState({
        startDate,
        endDate
      });
    };
    return (
      <View style={[styles.listContainer]}>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#039be5",
            paddingVertical: 5
          }}
        >
          <Text style={{ color: "#fff" }}>Showing transactions from</Text>
          <Text
            style={{ color: "#fff" }}
          >{`${state.startDate} - ${state.endDate}`}</Text>
        </View>
        <SectionList
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={styles.txnList}
          stickySectionHeadersEnabled
          sections={[
            ...Object.keys(groupedTransactions).map(key => ({
              name: key,
              data: groupedTransactions[key]
            }))
          ]}
          renderSectionHeader={({ section }) => (
            <TxnHeader data={section as any} />
          )}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <TxnItem data={item} index={index} />
          )}
        />
        <TransactionFilter
          lastFetched={lastFetched}
          clearFilters={clearFilters}
          applyFilter={handleApplyFilter}
          openDate={account.openingDate}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#fff",
    flex: 1
  },
  card: {
    marginHorizontal: 0,
    alignItems: "center",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  txnList: {
    marginTop: 10
  },
  txnListHeader: {
    paddingLeft: 10,
    fontSize: 20
  }
});
