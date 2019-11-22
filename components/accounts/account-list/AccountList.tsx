import React from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { NavigationStackProp } from "react-navigation-stack";
import { Amount } from "../../elements/amount/Amount";
import { Card } from "../../elements/card/Card";
import { IAccount, AccountClass } from "bank-core/dist/types";
import { normalize, normalizeHeight } from "../../../utils/normalize";

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
  const groupedAccounts = classifyAccounts(accounts);
  return (
    <View style={styles.accounts}>
      <ScrollView>
        {Object.keys(groupedAccounts).map(sectionKey => {
          const section = groupedAccounts[sectionKey];
          return (
            <View key={section.section}>
              <Text style={styles.sectionHeader}>{section.section}</Text>
              {section.accounts.map((account, index) => {
                return (
                  <Card style={styles.accountCard} key={account.id}>
                    <RectButton
                      onPress={() =>
                        navigation.navigate("AccountDetails", {
                          accountId: account.id,
                          name: account.nickName
                        })
                      }
                      style={{ flex: 1, padding: 10 }}
                    >
                      <View style={styles.accountPrimary}>
                        <View>
                          <Text style={styles.main}>{account.nickName}</Text>
                          <Text style={styles.secondary}>
                            {account.code + " " + account.accountNumber}
                          </Text>
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
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  accounts: {
    flex: 4,
    width: Dimensions.get("window").width
  },
  accountCard: {
    backgroundColor: "#039be5",
    marginVertical: 5,
    minHeight: normalizeHeight(120),
    padding: 0
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
