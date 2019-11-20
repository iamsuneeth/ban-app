import React from "react";
import { View, Text, StyleSheet, TextStyle, ViewStyle } from "react-native";
import NumberFormat from "react-number-format";
import { normalize } from "../../../utils/normalize";

const CURRENCY_SYMBOL_MAP: { [k: string]: string } = {
  GBP: "£",
  INR: "₹",
  EUR: "€",
  USD: "$"
};

type Props = {
  amount: number;
  currency: string;
  size?: number;
  style?: {
    container?: ViewStyle;
    content?: TextStyle;
  };
};
export const Amount = ({ amount, currency, size = 16, style = {} }: Props) => {
  const amountText = amount.toFixed(2);
  const [integer, decimal] = amountText.split(".");

  return (
    <NumberFormat
      value={integer}
      displayType={"text"}
      thousandSeparator={true}
      prefix={CURRENCY_SYMBOL_MAP[currency]}
      renderText={value => (
        <View style={{ ...styles.container, ...style.container }}>
          <Text
            style={{
              fontSize: normalize(size),
              fontWeight: "bold",
              ...style.content
            }}
          >
            {value}
          </Text>
          <Text
            testID="decimal"
            style={{
              fontSize: normalize(Math.round(size * 0.8)),
              paddingBottom: 1,
              ...style.content
            }}
          >
            .{decimal}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end"
  }
});
