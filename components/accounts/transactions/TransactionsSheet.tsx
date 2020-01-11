import React, { memo, useRef } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import { Card } from "../../elements/card/Card";
import { TxnItem } from "./TxnItem";
import Animated from "react-native-reanimated";
import { ITransaction, IAccount } from "bank-core/src/types";
import { TxnHeader } from "./TxnHeader";
import Constants from "expo-constants";
import { BorderlessButton } from "react-native-gesture-handler";
import { normalize } from "../../../utils/normalize";
import { Text } from "../../elements/text/Text";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Row } from "../../elements/view/Row";
import { ThemeType } from "../../../App";
import { Spacer } from "../../elements/utils/Spacer";
import { useHeaderHeight } from "@react-navigation/stack";

const renderContent = (
  sections: {
    [key: string]: {
      name: string;
      transactions: any[];
    };
  },
  loading: boolean,
  colors
) => (
  <Card style={styles.card}>
    {Object.keys(sections).map(sectionKey => [
      <TxnHeader
        key={sections[sectionKey].name}
        data={sections[sectionKey]}
        background={colors.surface}
      />,
      ...sections[sectionKey].transactions.map((item, index) => (
        <TxnItem key={item.id} data={item} index={index} />
      ))
    ])}
    <ActivityIndicator animating={loading} />
  </Card>
);

type Props = {
  loading: boolean;
  transactions: ITransaction[];
  account: IAccount;
  sheetRef?: React.LegacyRef<BottomSheet>;
  height: number;
};

const topPosition =
  Dimensions.get("window").height - Constants.statusBarHeight - 50;

export const TransactionSheet = memo(
  ({ sheetRef, transactions, loading, height, account }: Props) => {
    const sections: {
      [key: string]: {
        name: string;
        transactions: any[];
      };
    } = {};

    transactions.forEach(txn => {
      if (!(txn.date.toString() in sections)) {
        sections[txn.date.toString()] = {
          name: txn.date.format("DD/MM/YYYY"),
          transactions: []
        };
      }
      sections[txn.date.toString()].transactions.push(txn);
    });
    const navigation = useNavigation();
    const { colors } = useTheme() as ThemeType;
    const headerHeight = useHeaderHeight();
    return (
      <Animated.View style={{ flex: 1, elevation: 5 }}>
        <BottomSheet
          snapPoints={[topPosition - headerHeight, height - 50]}
          renderHeader={() => (
            <View
              style={{
                backgroundColor: colors.surface,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20
              }}
            >
              <Spacer type="medium" />
              <View
                style={{
                  width: normalize(50),
                  height: normalize(5, "height"),
                  backgroundColor: "#ccc",
                  borderRadius: 50,
                  alignSelf: "center"
                }}
              />
              <Row padding size="medium">
                <Text
                  type="header"
                  style={{
                    fontWeight: "bold"
                  }}
                >
                  Recent Transactions
                </Text>
                <BorderlessButton
                  onPress={() =>
                    navigation.navigate("Transactions", {
                      accountId: account.id
                    })
                  }
                >
                  <Text type="link">See all</Text>
                </BorderlessButton>
              </Row>
            </View>
          )}
          renderContent={() => renderContent(sections, loading, colors)}
          initialSnap={1}
          ref={sheetRef}
          enabledContentTapInteraction={false}
        />
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: normalize(0),
    paddingHorizontal: normalize(0),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "100%"
  },
  txnList: {
    marginTop: normalize(10, "height")
  },
  txnListHeader: {
    paddingLeft: normalize(10),
    fontSize: normalize(20)
  }
});
