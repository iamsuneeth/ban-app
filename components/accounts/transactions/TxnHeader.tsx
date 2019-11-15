import React from "react";
import { View, Text, SectionListData, StyleSheet } from "react-native";

type TxnHeaderProps = {
  data: SectionListData<any>;
};

export const TxnHeader = ({ data }: TxnHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.sectionHeader}>{data.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 10,
    backgroundColor: "#fff"
  },
  sectionHeader: {
    fontSize: 15,
    color: "gray",
    fontWeight: "500"
  }
});
