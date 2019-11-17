import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Card } from "../../elements/card/Card";
import { ISummary } from "bank-core/dist/types";
import { Amount } from "../../elements/amount/Amount";

type AccountSummaryProps = {
  summary: ISummary;
};

export const AccountSummary = ({ summary }: AccountSummaryProps) => {
  return (
    <Card style={styles.summary}>
      <View>
        <Text style={styles.label}>total balance</Text>

        <Amount
          style={{
            content: styles.totalAmount
          }}
          amount={summary.balance.amount}
          currency={summary.balance.currency}
          size={30}
        />
      </View>
      <View style={styles.additionalInfo}>
        <View style={styles.flexRow}>
          <Text style={styles.label}>available balance</Text>

          <Amount
            amount={summary.availableBalance.amount}
            currency={summary.availableBalance.currency}
            style={{ content: styles.otherAmount }}
          />
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.label}>overdfart</Text>
          <Amount
            amount={summary.usedOverdraft.amount}
            currency={summary.usedOverdraft.currency}
            style={{ content: styles.otherAmount }}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  summary: {
    flex: 1,
    justifyContent: "space-evenly",
    width: Dimensions.get("window").width - 20,
    margin: 10,
    padding: 10
  },
  label: {
    fontSize: 14,
    color: "gray",
    textTransform: "capitalize"
  },
  totalAmount: {
    color: "#333",
    fontWeight: "bold"
  },
  otherAmount: {
    color: "#333",
    fontSize: 14
  },
  additionalInfo: {
    height: 40
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
