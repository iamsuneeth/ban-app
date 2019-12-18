import { AccountList } from "../accounts/account-list/AccountList2";
import { AccountSummary } from "../accounts/account-sumary/AccountSummary";
import { StyleSheet, View } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import React, { useState, useEffect } from "react";
import { IAccount, IDashboardState } from "bank-core/src/types";

type Props = {
  navigation: NavigationStackProp<{}>;
  accounts: IAccount[];
  dashboard: IDashboardState;
};
export const Home = ({ navigation, dashboard, accounts }: Props) => {
  const [account, setAccount] = useState();
  useEffect(() => {
    if (!account) {
      setAccount(accounts[0]);
    }
  }, [accounts]);

  return (
    <View style={styles.container}>
      {dashboard.summary && <AccountSummary summary={dashboard.summary} />}
      {accounts.length > 0 && (
        <AccountList
          navigation={navigation}
          accounts={accounts}
          setAccount={setAccount}
          account={account}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
});
