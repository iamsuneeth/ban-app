import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  SectionList
} from "react-native";
import Animated from "react-native-reanimated";
import { NavigationStackProp } from "react-navigation-stack";
import { Card } from "../../elements/card/Card";

import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Divider } from "../../elements/divider/Divider";
import { RectButton } from "react-native-gesture-handler";
import { useState } from "react";
import { useTransition } from "../../../hooks/animation/useTransition";
import { Transaction } from "../transactions/Transactions";
import { getBottomSpace } from "react-native-iphone-x-helper";
const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);

type Props = {
  navigation: NavigationStackProp<{}>;
};

export const AccountDetails = ({ navigation }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const [animation, setInitial] = useTransition({ expanded, trigger: false });

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 400 - getBottomSpace()]
  });

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 5]
  });

  useEffect(() => console.log("rendering"));

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
        <View
          style={{
            flexDirection: "row",
            marginTop: 20
          }}
        >
          <RectButton
            onPress={() =>
              navigation.navigate("Payments", {
                accountId: "f453454"
              })
            }
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              marginHorizontal: 5
            }}
          >
            <MaterialIcons name="payment" size={25} />
            <Text style={{ fontSize: 12, alignSelf: "center" }}>
              Pay someone
            </Text>
          </RectButton>
          <View style={{ height: "100%" }}></View>
          <RectButton
            onPress={() =>
              navigation.navigate("Transfers", {
                accountId: "f453454"
              })
            }
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              marginHorizontal: 5
            }}
          >
            <Ionicons name="ios-cash" size={25} />
            <Text
              style={{ fontSize: 12, alignSelf: "center", textAlign: "center" }}
            >
              Transfer money
            </Text>
          </RectButton>
          <RectButton
            onPress={() =>
              navigation.navigate("Statements", {
                accountId: "f453454"
              })
            }
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              marginHorizontal: 5
            }}
          >
            <Ionicons name="ios-document" size={25} />
            <Text
              style={{ fontSize: 12, alignSelf: "center", textAlign: "center" }}
            >
              Statements
            </Text>
          </RectButton>
          <RectButton
            onPress={() => {}}
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              marginHorizontal: 5
            }}
          >
            <Ionicons name="ios-card" size={25} />
            <Text
              style={{ fontSize: 12, alignSelf: "center", textAlign: "center" }}
            >
              Debit card
            </Text>
          </RectButton>
        </View>
        <Animated.View style={{ height, marginTop: 20, overflow: "hidden" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, marginVertical: 15 }}>
              Account & branch details
            </Text>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  color: "#333",
                  fontSize: 14
                }}
              >
                SBTR00189
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 14,
                  textTransform: "uppercase"
                }}
              >
                ifsc code
              </Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  color: "#333",
                  fontSize: 14
                }}
              >
                branch name of some branch
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 14,
                  textTransform: "uppercase"
                }}
              >
                branch name
              </Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  color: "#333",
                  fontSize: 14
                }}
              >
                ABC bank, somewhere in India, locality, state, 678 900, India
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 14,
                  textTransform: "uppercase"
                }}
              >
                branch address
              </Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  color: "#333",
                  fontSize: 14
                }}
              >
                ABCHIJK8901
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 14,
                  textTransform: "uppercase"
                }}
              >
                bic
              </Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text
                style={{
                  color: "#333",
                  fontSize: 14
                }}
              >
                ABCDF3452345343670008
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 14,
                  textTransform: "uppercase"
                }}
              >
                iban
              </Text>
            </View>
            <Divider rootStyle={{ marginTop: 30 }} content={<Text>x</Text>} />
          </View>
        </Animated.View>
        <TouchableHighlight
          onPress={() => {
            setInitial();
            setExpanded(state => !state);
          }}
          style={styles.expandButton}
          underlayColor="#f1f1f1"
        >
          <AnimatedIcon
            name="downcircle"
            size={30}
            color="tomato"
            style={{ transform: [{ rotate: rotation }] }}
          />
        </TouchableHighlight>
      </Card>
      <Transaction />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between"
  },
  accountCard: {
    marginBottom: 20
  },
  section: {
    marginBottom: 10
  },
  main: { color: "#333", fontSize: 18, fontWeight: "bold" },
  secondary: { color: "gray", fontSize: 12 },
  highlight: { color: "#333", fontSize: 18 },
  expandButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: -10
  }
});
