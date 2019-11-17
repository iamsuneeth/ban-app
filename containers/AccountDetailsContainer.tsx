import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useAccountDetailsState } from "bank-core";
import { NavigationStackProp } from "react-navigation-stack";
import { AccountDetails } from "../components/accounts/account-details/AccountDetails";
import { NavigationParams } from "react-navigation";

type Props = {
  navigation: NavigationStackProp<{}>;
};

export const AccountDetailsContainer = ({ navigation }: Props) => {
  const accountId = navigation.state.params.accountId;
  const accountState = useAccountDetailsState(accountId);
  const navigate = (screen: string, state?: NavigationParams) =>
    navigation.navigate(screen, state);
  useEffect(() => {
    accountState.fetchDetails();
  }, []);
  return <AccountDetails {...accountState} navigate={navigate} />;
};
