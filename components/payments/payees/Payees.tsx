import React from "react";
import { View, Text } from "react-native";
import { IPayeeState } from "bank-core/typescript/types";

type props = {
  payees: IPayeeState;
};

export const Payees = ({ payees }: props) => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};
