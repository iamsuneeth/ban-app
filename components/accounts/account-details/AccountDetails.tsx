import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { Card } from "../../elements/card/Card";
import Animated, { Easing } from "react-native-reanimated";
import { useState } from "react";

type Props = {
  navigation: NavigationStackProp<{}>;
};

export const AccountDetails = ({ navigation }: Props) => {
  const [opacityValue, setOpacityValue] = useState(new Animated.Value(0));
  const opacityFunction = () => {
    opacityValue.setValue(0);
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear
    }).start();
  };
  useEffect(() => {
    opacityFunction();
  }, []);
  const accountId = navigation.getParam("accountId");
  const opacity = opacityValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 1]
  });
  return (
    <View style={styles.container}>
      <Card style={styles.accountCard}>
        <View style={styles.section}>
          <View>
            <Text style={styles.main}>{"My Savings Account"}</Text>
            <Text style={styles.secondary}>
              {"ADVANCE" + "|" + "SBTR00189" + "|" + "23335522"}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 25,
              color: "#333",
              textAlign: "right"
            }}
          >
            £3100.00
          </Text>
        </View>
        <View>
          <View
            style={{
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
              available overdraft
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
          <View
            style={{
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
              used overdraft
            </Text>

            <Text
              style={{
                color: "#333",
                fontSize: 14
              }}
            >
              £340.00
            </Text>
          </View>
        </View>
        <Animated.View style={[{ opacity }]}>
          <View style={styles.section}>
            <View>
              <Text style={styles.main}>{"My Savings Account"}</Text>
              <Text style={styles.secondary}>
                {"ADVANCE" + "|" + "SBTR00189" + "|" + "23335522"}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 25,
                color: "#333",
                textAlign: "right"
              }}
            >
              £3100.00
            </Text>
          </View>
          <View>
            <View
              style={{
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
                available overdraft
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
            <View
              style={{
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
                used overdraft
              </Text>

              <Text
                style={{
                  color: "#333",
                  fontSize: 14
                }}
              >
                £340.00
              </Text>
            </View>
          </View>
        </Animated.View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  accountCard: {},
  section: {
    marginBottom: 10
  },
  main: { color: "#333", fontSize: 18, fontWeight: "bold" },
  secondary: { color: "gray", fontSize: 12 },
  highlight: { color: "#333", fontSize: 18 }
});
