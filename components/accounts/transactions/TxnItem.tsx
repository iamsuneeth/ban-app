import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { Amount } from "../../elements/amount/Amount";
import { ITransaction } from "bank-core/src/types";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../../../App";
import { normalize } from "../../../utils/normalize";
import { PaddedView } from "../../elements/view/PaddedView";
import { Text } from "../../elements/text/Text";
import { Spacer } from "../../elements/utils/Spacer";
type TxnItemProps = {
  data: ITransaction;
  index: number;
};

export const TxnItem = ({ data, index }: TxnItemProps) => {
  const { colors } = useTheme() as ThemeType;
  return (
    <RectButton>
      <PaddedView style={styles.itemContainer}>
        <PaddedView style={styles.icon}>
          <Icons
            name="bank-transfer"
            size={normalize(40)}
            color={colors.primary}
          />
        </PaddedView>
        <View style={styles.main}>
          <Text style={styles.recepient}>{data.recepient}</Text>
          {data.description && (
            <>
              <Spacer />
              <Text numberOfLines={2} type="caption">
                {data.description}
              </Text>
            </>
          )}
        </View>
        <Amount
          amount={data.amount.amount}
          currency={data.amount.currency}
          size={18}
          style={{
            content: { ...styles.amount },
            container: styles.amountContainer
          }}
        />
      </PaddedView>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  main: {
    justifyContent: "center"
  },
  recepient: {
    fontSize: normalize(16)
  },
  icon: {
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
