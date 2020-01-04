import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import { ISummary } from "bank-core/src/types";
import { Amount } from "../../elements/amount/Amount";
import { normalize } from "../../../utils/normalize";
import Animated from "react-native-reanimated";
import { timing } from "react-native-redash";
import { useTheme } from "@react-navigation/material-top-tabs/lib/typescript/native/src";

type AccountSummaryProps = {
  summary: ISummary;
};

export const AccountSummary = React.memo(({ summary }: AccountSummaryProps) => {
  const { colors } = useTheme();
  const progressAnimation = new Animated.Value(0);
  const progressPercent =
    (summary.balance.amount / summary.availableBalance.amount) * 100;
  Animated.useCode(() => {
    return Animated.set(
      progressAnimation,
      timing({
        from: 0,
        to: progressPercent,
        duration: 1000
      })
    );
  }, [progressAnimation]);

  return (
    <View style={styles.summary}>
      <View>
        <Text style={[styles.label, { color: colors.text }]}>
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
          <Text style={[styles.label, { color: colors.text }]}>current</Text>
          <Text style={[styles.label, { color: colors.text }]}>overdraft</Text>
        </View>
        <View style={[styles.seperator, { backgroundColor: colors.primary }]}>
          <Animated.View
            style={{
              height: "100%",
              width: Animated.concat(progressAnimation, "%"),
              backgroundColor: "#3cb44b"
            }}
          />
        </View>
        <View style={styles.flexRow}>
          <Amount
            amount={summary.balance.amount}
            currency={summary.balance.currency}
            style={{
              content: { ...styles.otherAmount, color: colors.text }
            }}
            size={14}
          />
          <Amount
            amount={summary.usedOverdraft.amount}
            currency={summary.usedOverdraft.currency}
            style={{
              content: { ...styles.otherAmount, color: colors.text }
            }}
            size={14}
          />
        </View>
      </View>
    </View>
  );
});

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
    overflow: "hidden"
  }
});
