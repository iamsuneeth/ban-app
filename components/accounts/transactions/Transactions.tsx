import React, { memo, useReducer } from "react";
import {
  SectionList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { TxnHeader } from "./TxnHeader";
import { TxnItem } from "./TxnItem";
import {
  ITransaction,
  IAccount,
  SEARCH_TYPE,
  IFetchTransactionActionPayload,
  IFilterTransactionPayload
} from "bank-core/src/types";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { TransactionFilter } from "./TransactionFilter";
import { useTheme } from "@react-navigation/native";
import { normalize } from "../../../utils/normalize";

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

type Props = {
  loading: boolean;
  refreshing: boolean;
  transactions: ITransaction[];
  account: IAccount;
  lastFetched?: string;
  fetchTransactions: (
    filters: IFetchTransactionActionPayload,
    useCache?: boolean
  ) => void;
  filterTransaction: (props: IFilterTransactionPayload) => void;
  clearFilters: Function;
  type?: "mini" | "full" | "sheet";
};

interface ITransactionUIState {
  startDate: Dayjs;
  endDate: Dayjs;
}

export const Transaction = memo(
  ({
    transactions,
    account,
    loading,
    fetchTransactions,
    filterTransaction,
    clearFilters,
    lastFetched,
    refreshing,
    type = "full"
  }: Props) => {
    const [state, setState]: [
      ITransactionUIState,
      React.Dispatch<any>
    ] = useReducer((oldState, newState) => ({ ...oldState, ...newState }), {
      endDate: dayjs().startOf("date"),
      startDate: lastFetched
        ? dayjs(lastFetched).startOf("day")
        : dayjs()
            .subtract(1, "month")
            .startOf("date")
    });
    const { colors } = useTheme();
    let groupedTransactions: { [key: string]: any } = {};
    transactions.forEach(txn => {
      const key = txn.date.toString();
      if (!(key in groupedTransactions)) {
        groupedTransactions[key] = [];
      }
      groupedTransactions[key].push(txn);
    });

    const handleApplyFilter = ({
      txnTypes,
      fromAmount,
      toAmount,
      startDate,
      endDate
    }: IFilterTransactionPayload) => {
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
    const handleLoadMore = () => {
      const startDate = dayjs(lastFetched).subtract(1, "month");
      const endDate = dayjs(lastFetched);
      if (account.openingDate.isBefore(startDate)) {
        return;
      }
      fetchTransactions({
        type: SEARCH_TYPE.DEFAULT,
        startDate,
        endDate
      });
    };

    const handleRefresh = () => {
      fetchTransactions(
        {
          type: SEARCH_TYPE.DEFAULT,
          startDate: dayjs(lastFetched),
          endDate: dayjs().startOf("day")
        },
        false
      );
    };
    return (
      <View style={[styles.listContainer]}>
        {type === "full" && (
          <View
            style={{
              alignItems: "center",
              backgroundColor: colors.primary,
              paddingVertical: 5
            }}
          >
            <Text style={{ color: "#fff" }}>
              Showing transactions from{" "}
              {`${state.startDate.format(
                "DD/MM/YYYY"
              )} - ${state.endDate.format("DD/MM/YYYY")}`}
            </Text>
          </View>
        )}
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
          ListFooterComponent={() => {
            if (!loading) return null;
            return <ActivityIndicator color="#000" />;
          }}
          onEndReachedThreshold={0.4}
          onEndReached={handleLoadMore}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
        {type === "full" && (
          <TransactionFilter
            lastFetched={lastFetched}
            clearFilters={clearFilters}
            applyFilter={handleApplyFilter}
            openDate={account.openingDate}
          />
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  listContainer: {
    flex: 1
  },
  txnList: {
    marginTop: 10
  },
  txnListHeader: {
    paddingLeft: 10,
    fontSize: 20
  }
});
