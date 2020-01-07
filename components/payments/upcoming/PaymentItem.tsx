import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { Amount } from "../../elements/amount/Amount";
import { normalize } from "../../../utils/normalize";
type PaymentItemProps = {
  data: any;
  index: number;
};

export const PaymentItem = ({ data, index }: PaymentItemProps) => {
  return (
    <View>
      <RectButton>
        <View style={[styles.itemContainer]}>
          <View style={styles.icon}>
            <Icons name="bank-transfer" size={28} color="tomato" />
          </View>
          <View style={styles.main}>
            <Text style={styles.payee}>{data.merchant}</Text>
            {data.description && (
              <Text numberOfLines={2} style={styles.description}>
                {data.description}
              </Text>
            )}
          </View>
          <Amount
            amount={data.amount}
            currency={data.currency}
            size={18}
            style={{
              content: styles.amount,
              container: styles.amountContainer
            }}
          />
        </View>
      </RectButton>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
    paddingHorizontal: 10
  },
  main: {
    justifyContent: "center"
  },
  payee: {
    fontSize: 16
  },
  description: {
    fontSize: 12,
    color: "#888"
  },
  icon: {
    paddingRight: 10
  },
  amount: {
    fontWeight: "400",
    textAlign: "right"
  },
  amountContainer: {
    flex: 1,
    justifyContent: "flex-end"
  }
});
