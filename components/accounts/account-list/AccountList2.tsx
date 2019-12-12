import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { RectButton, FlatList } from "react-native-gesture-handler";
import { NavigationStackProp } from "react-navigation-stack";
import { Amount } from "../../elements/amount/Amount";
import { Card } from "../../elements/card/Card";
import { IAccount, AccountClass } from "bank-core/dist/types";
import { normalize, normalizeHeight } from "../../../utils/normalize";
import { useTheme } from "react-navigation";
import { ThemeColors } from "../../../theme/constants";
import Carousel from "react-native-snap-carousel";
import { TransactionContainer } from "../../../containers/TransactionContainer";
import { Ionicons } from "@expo/vector-icons";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const NameClassMap: { [key in AccountClass]: string } = {
  CSA: "Savings",
  TDA: "Term deposits",
  LON: "Loans",
  RDA: "Recurring deposits"
};

const classifyAccounts = (accounts: IAccount[]) => {
  const sections: {
    [key: string]: {
      section: string;
      accounts: IAccount[];
    };
  } = {};
  accounts.forEach(account => {
    if (account.class in sections) {
      sections[account.class].accounts.push(account);
    } else {
      sections[account.class] = {
        section: NameClassMap[account.class],
        accounts: [account]
      };
    }
  });
  return sections;
};

type Props = {
  navigation: NavigationStackProp<{}>;
  accounts: IAccount[];
};

export const AccountList = ({ navigation, accounts }: Props) => {
  const theme = useTheme();
  const themeColors = ThemeColors[theme];
  const [account, setAccount] = useState();
  useEffect(() => {
    if (!account) {
      setAccount(accounts[0]);
    }
  }, [accounts]);
  return (
    <View>
      <View style={styles.account}>
        <Carousel
          data={accounts}
          onSnapToItem={index => setAccount(accounts[index])}
          itemWidth={0.85 * screenWidth}
          sliderWidth={screenWidth}
          layout={"default"}
          renderItem={({ item: account }) => (
            <Card
              style={[
                styles.accountCard,
                {
                  backgroundColor: themeColors.primary
                }
              ]}
              key={account.id}
            >
              <RectButton
                onPress={() =>
                  navigation.navigate("AccountDetails", {
                    accountId: account.id,
                    name: account.nickName
                  })
                }
                testID="accountClick"
                style={{ flex: 1, padding: 10 }}
              >
                <View style={styles.accountPrimary}>
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
          )}
        />
      </View>
      <View style={{ paddingTop: 10 }}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            justifyContent: "space-between"
          }}
        >
          <Text
            style={{
              fontSize: normalize(20),
              fontWeight: "bold",
              color: themeColors.darkGray
            }}
          >
            Recent Transactions
          </Text>
          <Ionicons
            name="ios-search"
            size={28}
            color={themeColors.primaryDark}
          />
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
