import React from "react";
import { View, Text } from "react-native";
import AnimatedList from "../../elements/animated-list/AnimatedList";
import { IPayeeFilter, IPayee } from "bank-core/src/types";

type props = {
  payees: IPayee[];
  loading: boolean;
  filterPayees: (filter: IPayeeFilter) => void;
};

export const Payees = ({ payees, loading }: props) => {
  return (
    <View style={{ flex: 1 }}>
      <AnimatedList
        data={payees}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <View style={{ height: 100 }}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};
