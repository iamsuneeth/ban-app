import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Card } from "../../elements/card/Card";
import { ISummary } from "bank-core/src/types";
import { Amount } from "../../elements/amount/Amount";
import { normalize, normalizeHeight } from "../../../utils/normalize";
import { useTheme } from "react-navigation";
import { ThemeColors } from "../../../theme/constants";
import Animated from "react-native-reanimated";
import { timing } from "react-native-redash";
import { duration } from "moment";

type AccountSummaryProps = {
  summary: ISummary;
};

export const AccountSummary = React.memo(({ summary }: AccountSummaryProps) => {
  const theme = useTheme();
  const themeColors = ThemeColors[theme];
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
        <View
          style={[styles.seperator, { backgroundColor: themeColors.primary }]}
        >
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
