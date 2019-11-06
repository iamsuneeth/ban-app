import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Card } from "../../elements/card/Card";

export const AccountSummary = () => {
  return (
    <Card style={styles.summary}>
      <View>
        <Text
          style={{
            fontSize: 14,
            color: "gray",
            textTransform: "capitalize"
          }}
        >
          total balance
        </Text>
        <Text
          style={{
            fontSize: 30,
            color: "#333",
            fontWeight: "bold"
          }}
        >
          £3100.00
        </Text>
      </View>
      <View
        style={{
          height: 40
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text
            style={{
              color: "gray",
              fontSize: 14,
              textTransform: "capitalize"
            }}
          >
            available balance
          </Text>

          <Text style={{ color: "#333", fontSize: 14 }}>£5100.00</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text
            style={{
              color: "gray",
              fontSize: 14,
              textTransform: "capitalize"
            }}
          >
            overdfart
          </Text>

          <Text
            style={{
              color: "#333",
              fontSize: 14
            }}
          >
            £2000.00
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  summary: {
    flex: 1,
    justifyContent: "space-evenly",
    width: Dimensions.get("window").width - 20,
    margin: 10,
    padding: 10
  }
});
