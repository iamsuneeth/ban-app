import React from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { normalize } from "../../../utils/normalize";
import { colors } from "../../../theme/constants";
import { useTheme } from "@react-navigation/native";

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

type TxnHeaderProps = {
  data: {
    name: string;
    transactions: any[];
  };
};

export const TxnHeader = ({ data }: TxnHeaderProps) => {
  const { colors } = useTheme();
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.sectionHeader, { color: colors.text }]}>
        {getContent(data.name)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  sectionHeader: {
    fontSize: normalize(14),
    fontWeight: "500"
  }
});
