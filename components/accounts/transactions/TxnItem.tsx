import React from "react";
import { View, Text, SectionListData, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
type TxnItemProps = {
  data: any;
  index: number;
};

export const TxnItem = ({ data, index }: TxnItemProps) => {
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
          <Text style={styles.amount}>{"£" + data.amount.toFixed(2)}</Text>
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
    fontSize: 18,
    flex: 1,
    fontWeight: "400",
    textAlign: "right"
  }
});
