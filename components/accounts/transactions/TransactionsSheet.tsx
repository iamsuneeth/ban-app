import React, { memo } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import BottomSheet from "reanimated-bottom-sheet";
import { Card } from "../../elements/card/Card";
import { TxnItem } from "./TxnItem";
import { LinearGradient } from "expo-linear-gradient";

dayjs.extend(advancedFormat);

const transactions = [
  {
    id: "354erere",
    referenceNo: "GHB0034343488",
    date: "2019-11-11",
    description: "some where you made payment",
    merchant: "Travel London",
    amount: 1.5,
    currency: "INR",
    merchantId: "tfl",
    category: "transport"
  },
  {
    id: "232323sds",
    referenceNo: "GHB0034567488",
    date: "2019-09-05",
    merchant: "Travel London",
    amount: 1.7,
    currency: "GBP",
    merchantId: "tfl",
    category: "transport"
  },
  {
    id: "hjhj54545",
    referenceNo: "BNJ00GB5689089",
    date: "2019-09-04",
    merchant: "Asda",
    amount: 45.5,
    currency: "GBP",
    merchantId: "asda",
    category: "groceries"
  },
  {
    id: "fgff54544",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "rtht3434",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "fgdsff54544",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "jgsdf4545",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "tgfgdfgfg",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "45dfdsdsdssfsd",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "fgdfgdfsdd",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "45dfdssdsfgfsd",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  },
  {
    id: "dssfdsf",
    referenceNo: "GHB00GH232323",
    date: "2019-09-03",
    merchant: "Boots",
    amount: 3,
    currency: "GBP",
    merchantId: "boots",
    category: "pharmacy"
  }
];

const getSection = (date: string, txns: typeof transactions) => {
  const currentDate = dayjs(date);
  const isToday = currentDate.isSame(dayjs().startOf("day"));
  const format =
    currentDate.get("year") === dayjs().get("year")
      ? "dddd, Do MMMM"
      : "dddd, Do MMMM YYYY";
  return {
    title: isToday ? "Today" : currentDate.format(format),
    data: txns
  };
};

const renderContent = () => (
  <Card style={styles.card}>
    {transactions.map((item, index) => (
      <TxnItem key={item.id} data={item} index={index} />
    ))}
  </Card>
);

const renderHeader = () => (
  <View
    style={{
      backgroundColor: "#fff",
      height: 30,
      justifyContent: "center",
      bottom: -10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
    }}
  >
    <View
      style={{
        width: 50,
        height: 5,
        backgroundColor: "#ccc",
        borderRadius: 50,
        alignSelf: "center"
      }}
    ></View>
  </View>
);

export const Transaction = memo(
  () => {
    let groupedTransactions: { [key: string]: any } = {};
    transactions.forEach(txn => {
      if (!(txn.date in groupedTransactions)) {
        groupedTransactions[txn.date] = [];
      }
      groupedTransactions[txn.date].push(txn);
    });

    return (
      <View style={{ flex: 1, elevation: 2 }}>
        <BottomSheet
          snapPoints={[700, 500, 100]}
          renderContent={renderContent}
          renderHeader={renderHeader}
          initialSnap={1}
        />
      </View>
    );
  },
  () => true
);

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 20,
    zIndex: 100,
    height: Dimensions.get("window").height * 0.8,
    elevation: 5
  },
  card: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
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
