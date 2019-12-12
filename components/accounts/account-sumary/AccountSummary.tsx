import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Card } from "../../elements/card/Card";
import { ISummary } from "bank-core/dist/types";
import { Amount } from "../../elements/amount/Amount";
import { normalize, normalizeHeight } from "../../../utils/normalize";
import { useTheme } from "react-navigation";
import { ThemeColors } from "../../../theme/constants";

type AccountSummaryProps = {
  summary: ISummary;
};

export const AccountSummary = ({ summary }: AccountSummaryProps) => {
  const theme = useTheme();
  const themeColors = ThemeColors[theme];
  return (
    <View style={styles.summary}>
      <View>
        <Text style={[styles.label, { color: themeColors.darkGray }]}>
          available balance
        </Text>

        <Amount
          style={{
            content: styles.totalAmount
          }}
          amount={summary.availableBalance.amount}
          currency={summary.availableBalance.currency}
          size={30}
        />
      </View>
      <View style={styles.additionalInfo}>
        <View style={styles.flexRow}>
          <Text style={[styles.label, { color: themeColors.gray }]}>
            current
          </Text>
          <Text style={[styles.label, { color: themeColors.gray }]}>
            overdraft
          </Text>
        </View>
        <View style={styles.seperator} />
        <View style={styles.flexRow}>
          <Amount
            amount={summary.balance.amount}
            currency={summary.balance.currency}
            style={{
              content: { ...styles.otherAmount, color: themeColors.darkGray }
            }}
            size={14}
          />
          <Amount
            amount={summary.usedOverdraft.amount}
            currency={summary.usedOverdraft.currency}
            style={{
              content: { ...styles.otherAmount, color: themeColors.darkGray }
            }}
            size={14}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  summary: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width - 20,
    margin: 10,
    padding: 10
  },
  label: {
    fontSize: normalize(14),
    textAlign: "center",
    textTransform: "capitalize"
  },
  totalAmount: {
    fontWeight: "bold"
  },
  otherAmount: {},
  additionalInfo: {
    width: "80%"
  },
  flexRow: {
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-between"
  },
  seperator: {
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "green"
  }
});
