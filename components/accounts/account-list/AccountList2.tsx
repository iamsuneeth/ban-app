import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Platform
} from "react-native";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";

import { Amount } from "../../elements/amount/Amount";
import { Card } from "../../elements/card/Card";
import { IAccount } from "bank-core/src/types";
import { normalize } from "../../../utils/normalize";

import Carousel from "react-native-snap-carousel";
import { TransactionContainer } from "../../../containers/TransactionContainer";
import { Ionicons } from "@expo/vector-icons";
import { HomeParamList } from "../../../stacks/HomeStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTheme, useNavigation } from "@react-navigation/native";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

type AccountListNavigationProp = StackNavigationProp<HomeParamList, "Accounts">;
type Props = {
  accounts: IAccount[];
  account: IAccount;
  setAccount: (account: IAccount) => void;
};

const Account = ({ account, colors, navigation }) => {
  return (
    // <SharedElement key={account.id} id={account.id} style={{ flex: 1 }}>
    <Card
      style={[
        styles.accountCard,
        {
          backgroundColor: colors.primary
        }
      ]}
    >
      <RectButton
        onPress={() =>
          navigation.navigate("AccountDetails", {
            account
          })
        }
        testID="accountClick"
        style={{ flex: 1, padding: 10 }}
      >
        <View style={styles.accountPrimary}>
          <View style={{ position: "absolute", right: 0 }}>
            <Ionicons
              name="ios-arrow-dropright"
              size={25}
              color={colors.lightGray}
            />
          </View>

          <View>
            <Text style={styles.main}>{account.nickName}</Text>
            <Text style={styles.secondary}>
              {account.code + " " + account.accountNumber}
            </Text>
            <Text style={styles.secondary}>{account.type}</Text>
          </View>
          <View style={{ alignSelf: "flex-end" }}>
            <Amount
              amount={account.balance.amount}
              currency={account.balance.currency}
              style={{ content: { color: "#fff" } }}
              size={25}
            />
          </View>
        </View>
      </RectButton>
    </Card>
    // </SharedElement>
  );
};

export const AccountList = ({ accounts, setAccount, account }: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation<AccountListNavigationProp>();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.account}>
        <Carousel
          data={accounts}
          onSnapToItem={index => setAccount(accounts[index])}
          itemWidth={0.8 * screenWidth}
          sliderWidth={screenWidth}
          layout={"default"}
          renderItem={({ item: account }) => (
            <Account
              account={account}
              colors={colors}
              navigation={navigation}
            />
          )}
        />
      </View>
      <View style={{ paddingTop: 10, paddingHorizontal: 10, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            marginBottom: 10,
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: normalize(20),
              fontWeight: "bold",
              color: colors.text
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
            <Text
              style={{
                fontSize: normalize(14),
                color: colors.primary
              }}
            >
              See all
            </Text>
          </BorderlessButton>
        </View>

        {account && <TransactionContainer accountId={account.id} type="mini" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  account: {
    maxHeight: screenHeight * 0.2,
    marginVertical: 10
  },
  accountCard: {
    padding: 0,
    flex: 1
  },
  accountPrimary: {
    flex: 1,
    justifyContent: "space-between"
  },
  main: { color: "#fff", fontSize: normalize(16) },
  secondary: { color: "#fff", fontSize: normalize(12) },
  highlight: { color: "#fff", fontSize: normalize(18) },
  sectionHeader: {
    fontSize: normalize(20),
    margin: 15,
    fontWeight: "bold",
    color: "#555"
  },
  seperator: {
    backgroundColor: "#f5f5f5",
    height: 1,
    marginHorizontal: 10
  },
  section: {}
});
