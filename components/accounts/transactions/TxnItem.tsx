import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { normalize } from "../../../utils/normalize";
import { Amount } from "../../elements/amount/Amount";
import { ITransaction } from "bank-core/src/types";
import { useTheme } from "@react-navigation/bottom-tabs/lib/typescript/native/src";
type TxnItemProps = {
  data: ITransaction;
  index: number;
};

export const TxnItem = ({ data, index }: TxnItemProps) => {
  const { colors } = useTheme();
  return (
    <View>
      <RectButton>
        <View style={[styles.itemContainer]}>
          <View style={styles.icon}>
            <Icons name="bank-transfer" size={40} color={colors.primary} />
          </View>
          <View style={styles.main}>
            <Text style={styles.payee}>{data.recepient}</Text>
            {data.description && (
              <Text
                numberOfLines={2}
                style={[styles.description, { color: colors.text }]}
              >
                {data.description}
              </Text>
            )}
          </View>
          <Amount
            amount={data.amount.amount}
            currency={data.amount.currency}
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
    paddingHorizontal: 10,
    marginVertical: 5
  },
  main: {
    justifyContent: "center"
  },
  payee: {
    fontSize: normalize(16)
  },
  description: {
    fontSize: normalize(12)
  },
  icon: {
    padding: 5,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50
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
