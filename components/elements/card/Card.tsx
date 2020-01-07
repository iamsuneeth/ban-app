import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { normalize } from "../../../utils/normalize";

export const Card: React.FC<ViewProps> = ({ children, style, ...rest }) => (
  <View style={[styles.card, style]} {...rest}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    shadowColor: "#ccc",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 2,
    marginVertical: 5
  }
});
