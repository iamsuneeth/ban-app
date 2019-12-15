import { AccountList } from "../accounts/account-list/AccountList2";
import { AccountSummary } from "../accounts/account-sumary/AccountSummary";
import { StyleSheet, View } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { IAccount, IDashboardState } from "bank-core/dist/types";
import React, { useState, useEffect } from "react";
import { AccountDetails } from "../accounts/account-details/AccountDetails2";

type Props = {
  navigation: NavigationStackProp<{}>;
  accounts: IAccount[];
  dashboard: IDashboardState;
};
export const Home = ({ navigation, dashboard, accounts }: Props) => {
  const [account, setAccount] = useState();
  const [pos, setPos] = useState();
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    if (!account) {
      setAccount(accounts[0]);
    }
  }, [accounts]);
  const open = (position: Position) => {
    setPos(position);
    setShowDetails(true);
  };

  const close = () => {
    setPos(null);
  };

  return (
    <View style={styles.container}>
      {dashboard.summary && <AccountSummary summary={dashboard.summary} />}
      {accounts.length > 0 && (
        <AccountList
          navigation={navigation}
          accounts={accounts}
          setAccount={setAccount}
          account={account}
          showDetails={showDetails}
          setShowDetails={open}
        />
      )}
      {showDetails && (
        <AccountDetails account={account} position={pos} close={close} />
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
