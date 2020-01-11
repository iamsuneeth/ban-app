import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { ISummary } from "bank-core/src/types";
import { Amount } from "../../elements/amount/Amount";
import Animated from "react-native-reanimated";
import { timing } from "react-native-redash";
import { useTheme } from "@react-navigation/native";
import { normalize } from "../../../utils/normalize";
import { Text } from "../../elements/text/Text";
import { PaddedView } from "../../elements/view/PaddedView";

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
    <PaddedView style={styles.summary}>
      <View>
        <Text center>Available balance</Text>

        <Amount
          style={{
            content: { ...styles.totalAmount }
          }}
          amount={summary.availableBalance.amount}
          currency={summary.availableBalance.currency}
          size={30}
        />
      </View>
      <View style={styles.additionalInfo}>
        <PaddedView style={styles.flexRow}>
          <Text>Current</Text>
          <Text>Overdraft</Text>
        </PaddedView>
        <View style={[styles.seperator, { backgroundColor: "red" }]}>
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
            size={14}
          />
          <Amount
            amount={summary.usedOverdraft.amount}
            currency={summary.usedOverdraft.currency}
            size={14}
          />
        </View>
      </View>
    </PaddedView>
  );
});

const styles = StyleSheet.create({
  summary: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width - 20
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
    justifyContent: "space-between"
  },
  seperator: {
    height: normalize(5, "height"),
    borderRadius: 2.5,
    overflow: "hidden"
  }
});
