import { AccountList } from "../accounts/account-list/AccountList";
import { AccountSummary } from "../accounts/account-sumary/AccountSummary";
import { StyleSheet, View } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { IAccount, IDashboardState } from "bank-core/dist/types";
import React from "react";

type Props = {
  navigation: NavigationStackProp<{}>;
  accounts: IAccount[];
  dashboard: IDashboardState;
};
export const Home = ({ navigation, dashboard, accounts }: Props) => {
  return (
    <View style={styles.container}>
      {dashboard.summary && <AccountSummary summary={dashboard.summary} />}
      {accounts.length > 0 && (
        <AccountList navigation={navigation} accounts={accounts} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center"
  }
});
