import React from "react";
import { View, StyleSheet } from "react-native";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useTheme } from "@react-navigation/native";
import { normalize } from "../../../utils/normalize";
import { Text } from "../../elements/text/Text";
import { ThemeType } from "../../../App";

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
  background?: string;
};

export const TxnHeader = ({ data, background }: TxnHeaderProps) => {
  const { colors } = useTheme() as ThemeType;
  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: background || colors.background }
      ]}
    >
      <Text style={[styles.sectionHeader]}>{getContent(data.name)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: normalize(10)
  },
  sectionHeader: {
    fontWeight: "bold"
  }
});
