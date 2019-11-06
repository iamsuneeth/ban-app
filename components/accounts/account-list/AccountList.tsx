import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  GestureResponderEvent,
  TouchableHighlight,
  Platform
} from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { NavigationStackProp } from "react-navigation-stack";
import { Amount } from "../../elements/amount/Amount";
import { Card } from "../../elements/card/Card";

const TestAccounts = [
  {
    section: "Savings",
    accounts: [
      {
        id: "232323",
        accountNumber: "823232323",
        code: "ABCTR050000",
        balance: { amount: 32344.22, currency: "GBP" },
        nickName: "Current Account",
        overdraft: { amount: 323.33, currency: "GBP" },
        availableOverdraft: { amount: 1500, currency: "GBP" },
        availableBalance: { amount: 340, currency: "GBP" },
        openingDate: "2018-09-05",
        customerId: 12567,
        type: "ADVANCE",
        debitCardAvailable: true
      },
      {
        id: "4567",
        accountNumber: "678904455",
        code: "ABCTR050000",
        balance: { amount: 456.5, currency: "GBP" },
        nickName: "Savings Account",
        overdraft: { amount: 45.33, currency: "GBP" },
        availableOverdraft: { amount: 2000, currency: "GBP" },
        availableBalance: { amount: 23, currency: "GBP" },
        openingDate: "2017-09-05",
        customerId: 12567,
        type: "STANDARD",
        debitCardAvailable: false
      }
    ]
  }
];

const getTouchableComponent = ({
  child,
  onPress
}: {
  child: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
}) => {
  if (Platform.OS === "android") {
    return (
      <View>
        <TouchableNativeFeedback testID="accountClick" onPress={onPress}>
          {child}
        </TouchableNativeFeedback>
      </View>
    );
  } else {
    return (
      <View>
        <TouchableHighlight testID="accountClick" onPress={onPress}>
          {child}
        </TouchableHighlight>
      </View>
    );
  }
};

type Props = {
  navigation: NavigationStackProp<{}>;
};

export const AccountList = ({ navigation }: Props) => {
  return (
    <View style={styles.accounts}>
      <ScrollView>
        {TestAccounts.map(section => (
          <Card key={section.section}>
            <Text style={styles.sectionHeader}>{section.section}</Text>
            {section.accounts.map((account, index) => {
              return (
                <View key={account.id}>
                  {getTouchableComponent({
                    child: (
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
                    ),
                    onPress: () =>
                      navigation.navigate("AccountDetails", {
                        accountId: account.id
                      })
                  })}
                  {index !== section.accounts.length - 1 && (
                    <View
                      style={{
                        backgroundColor: "#f5f5f5",
                        height: 1,
                        marginHorizontal: 10
                      }}
                    />
                  )}
                </View>
              );
            })}
          </Card>
        ))}
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
    minHeight: 80,
    backgroundColor: "#fff"
  },
  accountPrimary: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  main: { color: "#333", fontSize: 16 },
  secondary: { color: "gray", fontSize: 12 },
  highlight: { color: "#333", fontSize: 18 },
  sectionHeader: {
    fontSize: 20,
    marginVertical: 10,
    paddingBottom: 5,
    fontWeight: "bold",
    color: "gray"
  }
});
