import React from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
;

dayjs.extend(advancedFormat);

const getContent = (date: string) => {
  const currentDate = dayjs(date);
  const isToday = currentDate.isSame(dayjs().startOf("day"));
  const format =
    currentDate.get("year") === dayjs().get("year")
      ? "dddd, Do MMMM"
      : "dddd, Do MMMM YYYY";
  return isToday ? "Today" : currentDate.format(format);
};

type PaymentHeaderProps = {
  data: {
    name: string;
  };
};

export const PaymentHeader = ({ data }: PaymentHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.sectionHeader}>{getContent(data.name)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  sectionHeader: {
    fontSize: 15,
    color: "gray",
    fontWeight: "500"
  }
});
