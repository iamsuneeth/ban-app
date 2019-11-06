import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";

export const Card: React.FC<ViewProps> = ({ children, style, ...rest }) => (
  <View style={[styles.card, style]} {...rest}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 2,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    shadowOffset: {
      width: 5,
      height: 2
    },
    elevation: 2,
    marginVertical: 5
  }
});
