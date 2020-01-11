import { AccountList } from "../accounts/account-list/AccountList";
import { AccountSummary } from "../accounts/account-sumary/AccountSummary";
import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { IAccount, IDashboardState } from "bank-core/src/types";

type Props = {
  accounts: IAccount[];
  dashboard: IDashboardState;
};
export const Home = ({ dashboard, accounts }: Props) => {
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
