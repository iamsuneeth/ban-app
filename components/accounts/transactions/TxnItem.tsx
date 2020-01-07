import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { Amount } from "../../elements/amount/Amount";
import { ITransaction } from "bank-core/src/types";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../../../App";
import { normalize } from "../../../utils/normalize";
type TxnItemProps = {
  data: ITransaction;
  index: number;
};

export const TxnItem = ({ data, index }: TxnItemProps) => {
  const { colors } = useTheme() as ThemeType;
  return (
    <View>
      <RectButton>
        <View style={[styles.itemContainer]}>
          <View style={styles.icon}>
            <Icons name="bank-transfer" size={40} color={colors.primary} />
          </View>
          <View style={styles.main}>
            <Text style={[styles.recepient, { color: colors.text }]}>
              {data.recepient}
            </Text>
            {data.description && (
              <Text
                numberOfLines={2}
                style={[styles.description, { color: colors.textSecondary }]}
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
              content: { ...styles.amount, color: colors.text },
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
    paddingHorizontal: normalize(10),
    marginVertical: normalize(5)
  },
  main: {
    justifyContent: "center"
  },
  recepient: {
    fontSize: normalize(16)
  },
  description: {
    fontSize: normalize(12)
  },
  icon: {
    padding: normalize(5),
    marginRight: normalize(5),
    alignItems: "center",
    justifyContent: "center",
    width: normalize(50),
    height: normalize(50)
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
