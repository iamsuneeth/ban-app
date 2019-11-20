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
            <Card key={section.section}>
              <Text style={styles.sectionHeader}>{section.section}</Text>
              {section.accounts.map((account, index) => {
                return (
                  <View key={account.id}>
                    <RectButton
                      onPress={() =>
                        navigation.navigate("AccountDetails", {
                          accountId: account.id,
                          name: account.nickName
                        })
                      }
                    >
                      <View style={styles.accountCard}>
                        <View style={styles.accountPrimary}>
                          <View>
                            <Text style={styles.main}>{account.nickName}</Text>
                            <Text style={styles.secondary}>
                              {account.code + " " + account.accountNumber}
                            </Text>
                          </View>
                          <View>
                            <Amount
                              amount={account.balance.amount}
                              currency={account.balance.currency}
                              size={25}
                            />
                          </View>
                        </View>
                      </View>
                    </RectButton>
                    {index !== section.accounts.length - 1 && (
                      <View style={styles.seperator} />
                    )}
                  </View>
                );
              })}
            </Card>
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
    marginVertical: 5,
    minHeight: 80
  },
  accountPrimary: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  main: { color: "#333", fontSize: normalize(16) },
  secondary: { color: "gray", fontSize: normalize(12) },
  highlight: { color: "#333", fontSize: normalize(18) },
  sectionHeader: {
    fontSize: normalize(20),
    marginVertical: 10,
    paddingBottom: 5,
    fontWeight: "bold",
    color: "gray"
  },
  seperator: {
    backgroundColor: "#f5f5f5",
    height: 1,
    marginHorizontal: 10
  }
});
