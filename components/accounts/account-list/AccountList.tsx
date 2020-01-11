import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";

import { Amount } from "../../elements/amount/Amount";
import { Card } from "../../elements/card/Card";
import { IAccount } from "bank-core/src/types";
import Carousel from "react-native-snap-carousel";
import { TransactionContainer } from "../../../containers/TransactionContainer";
import { Ionicons } from "@expo/vector-icons";
import { HomeParamList } from "../../../stacks/HomeStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme, useNavigation } from "@react-navigation/native";
import { normalize } from "../../../utils/normalize";
import { Text } from "../../elements/text/Text";
import { ThemeType } from "../../../App";
import { PaddedView } from "../../elements/view/PaddedView";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

type AccountListNavigationProp = StackNavigationProp<HomeParamList, "Accounts">;
type Props = {
  accounts: IAccount[];
  account: IAccount;
  setAccount: (account: IAccount) => void;
};

const Account = ({ account, colors, dark, navigation }) => {
  return (
    <RectButton
      onPress={() =>
        navigation.navigate("AccountDetails", {
          account
        })
      }
      testID="accountClick"
      style={{ flex: 1 }}
    >
      <Card
        style={[
          styles.accountPrimary,
          {
            backgroundColor: dark ? colors.primaryDark : colors.primary
          }
        ]}
      >
        <View style={{ position: "absolute", right: 10, top: 10 }}>
          <Ionicons
            name="ios-arrow-dropright"
            size={25}
            color={colors.textOnPrimary}
          />
        </View>

        <View>
          <Text
            type="main"
            style={{
              color: colors.textOnPrimary
            }}
          >
            {account.nickName}
          </Text>
          <Text type="caption" style={{ color: colors.textOnPrimary }}>
            {account.code + " " + account.accountNumber}
          </Text>
          <Text style={{ color: colors.textOnPrimary }}>{account.type}</Text>
        </View>
        <View style={{ alignSelf: "flex-end" }}>
          <Amount
            amount={account.balance.amount}
            currency={account.balance.currency}
            style={{ content: { color: colors.textOnPrimary } }}
            size={25}
          />
        </View>
      </Card>
    </RectButton>
  );
};

export const AccountList = ({ accounts, setAccount, account }: Props) => {
  const { colors, dark } = useTheme() as ThemeType;
  const navigation = useNavigation<AccountListNavigationProp>();
  return (
    <View style={{ flex: 1 }}>
      <PaddedView margin vertical size="large" style={styles.account}>
        <Carousel
          data={accounts}
          onSnapToItem={index => setAccount(accounts[index])}
          itemWidth={0.8 * screenWidth}
          sliderWidth={screenWidth}
          layout={"default"}
          renderItem={({ item: account }) => (
            <Account
              account={account}
              dark={dark}
              colors={colors}
              navigation={navigation}
            />
          )}
        />
      </PaddedView>
      <View>
        <PaddedView
          size="medium"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
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
        </PaddedView>

        {account && <TransactionContainer accountId={account.id} type="mini" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  account: {
    maxHeight: normalize(150)
  },
  accountCard: {
    flex: 1
  },
  accountPrimary: {
    flex: 1,
    justifyContent: "space-between"
  },
  main: { fontSize: normalize(18) },
  secondary: { fontSize: normalize(13) },
  sectionHeader: {
    fontSize: normalize(20),
    margin: normalize(15),
    fontWeight: "bold",
    color: "#555"
  },
  seperator: {
    backgroundColor: "#f5f5f5",
    height: normalize(1, "height"),
    marginHorizontal: normalize(10)
  },
  section: {}
});
