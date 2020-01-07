import React from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useTheme } from "@react-navigation/native";
import { colors } from "../../../theme/constants";
import { normalize } from "../../../utils/normalize";

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
    <View
      style={[styles.headerContainer, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.sectionHeader, { color: colors.text }]}>
        {getContent(data.name)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: normalize(10)
  },
  sectionHeader: {
    fontSize: normalize(14),
    fontWeight: "500"
  }
});
