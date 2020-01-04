import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useAccountDetailsState } from "bank-core";
import { AccountDetails } from "../components/accounts/account-details/AccountDetails";
import { RouteProp } from "@react-navigation/native";
import { HomeParamList } from "../stacks/HomeStack";

type AccountDetailsRouteProp = RouteProp<HomeParamList, "AccountDetails">;

type Props = {
  route: AccountDetailsRouteProp;
};

export const AccountDetailsContainer = ({ route }: Props) => {
  const accountId = route.params.account.id;
  const accountState = useAccountDetailsState(accountId);

  useEffect(() => {
    accountState.fetchDetails();
  }, []);
  return <AccountDetails {...accountState} />;
};

// AccountDetailsContainer.sharedElements = (
//   navigation: NavigationStackProp<{}>,
//   otherNavigation,
//   showing
// ) => {
//   return [
//     {
//       id: navigation.state.params.accountId,
//       resize: "clip",
//       align: "top-left"
//     }
//   ];
// };
