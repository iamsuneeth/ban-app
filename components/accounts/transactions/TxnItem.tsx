import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { normalize } from "../../../utils/normalize";
import { Amount } from "../../elements/amount/Amount";
import { ITransaction } from "bank-core/dist/types";
import { ThemeColors } from "../../../theme/constants";
import { useTheme } from "react-navigation";
type TxnItemProps = {
  data: ITransaction;
  index: number;
};

export const TxnItem = ({ data, index }: TxnItemProps) => {
  const themecolors = ThemeColors[useTheme()];
  return (
    <View>
      <RectButton>
        <View style={[styles.itemContainer]}>
          <View style={styles.icon}>
            <Icons
              name="bank-transfer"
              size={40}
              color={themecolors.primaryDark}
            />
          </View>
          <View style={styles.main}>
            <Text style={styles.payee}>{data.merchant}</Text>
            {data.description && (
              <Text
                numberOfLines={2}
                style={[styles.description, { color: themecolors.gray }]}
              >
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
    fontSize: normalize(16)
  },
  description: {
    fontSize: normalize(12)
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
