import React, {
  memo,
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback
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
  GestureResponderEvent
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { getBottomSpace } from "react-native-iphone-x-helper";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { TxnHeader } from "./TxnHeader";
import { TxnItem } from "./TxnItem";
import { Card } from "../../elements/card/Card";
import {
  PanGestureHandler,
  State,
  PanGestureHandlerStateChangeEvent,
  FlatList,
  TextInput
} from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";
import { panGestureHandler, onGestureEvent, spring } from "react-native-redash";
import { getTabBarHeight } from "../../common/TabBar";
import Constants from "expo-constants";
import { ITransaction, IAccount } from "bank-core/dist/types";

dayjs.extend(advancedFormat);

const getSection = (date: string, txns: ITransaction[]) => {
  const currentDate = dayjs(date);
  const isToday = currentDate.isSame(dayjs().startOf("day"));
  const format =
    currentDate.get("year") === dayjs().get("year")
      ? "dddd, Do MMMM"
      : "dddd, Do MMMM YYYY";
  return {
    name: isToday ? "Today" : currentDate.format(format),
    data: txns
  };
};

type Props = {
  loading: boolean;
  transactions: ITransaction[];
  account: IAccount;
  fetchTransactions: Function;
  filterTransaction: Function;
  clearFilters: Function;
};

export const Transaction = memo(
  ({
    transactions,
    account,
    loading,
    fetchTransactions,
    filterTransaction,
    clearFilters
  }: Props) => {
    let groupedTransactions: { [key: string]: any } = {};
    transactions.forEach(txn => {
      if (!(txn.date in groupedTransactions)) {
        groupedTransactions[txn.date] = [];
      }
      groupedTransactions[txn.date].push(txn);
    });

    const renderDateFilter = useCallback(() => {}, []);

    return (
      <View style={[styles.listContainer]}>
        <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
          <TextInput
            placeholder={"Search"}
            clearButtonMode={"unless-editing"}
            style={{
              height: 40,
              borderColor: "tomato",
              borderWidth: 1,
              borderRadius: 5,
              padding: 10
            }}
          />
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
        <BottomSheet
          renderContent={() => <Text>sfsdfdsfd</Text>}
          snapPoints={["40%", -50]}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: "#fff",
    flex: 1,
    paddingVertical: 10
  },
  card: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
    elevation: 0,
    shadowOpacity: 0
  },
  txnList: {
    marginTop: 10
  },
  txnListHeader: {
    paddingLeft: 10,
    fontSize: 20
  }
});
