import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { normalize } from "../../../utils/normalize";
import { Card } from "../../elements/card/Card";
import { RectButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons as Icons, Ionicons } from "@expo/vector-icons";
import { useTheme, CompositeNavigationProp } from "@react-navigation/native";
import { PaymentTopBarParamList } from "../../../tabs/PaymentTopBar";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentParamList } from "../../../stacks/PaymentStack";

type UpcomingNaviagtionProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<PaymentTopBarParamList, "Upcoming">,
  StackNavigationProp<PaymentParamList>
>;

export const Upcoming = ({
  navigation
}: {
  navigation: UpcomingNaviagtionProp;
}) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Card
        style={{
          marginTop: 0,
          marginHorizontal: 0,
          shadowOpacity: 0.2
        }}
      >
        <RectButton onPress={() => navigation.navigate("FuturePayments")}>
          <View style={[styles.itemContainer]}>
            <View style={styles.icon}>
              <Icons
                name="bank-transfer-out"
                size={40}
                color={colors.primary}
              />
            </View>
            <View style={styles.main}>
              <Text style={styles.header}>Future payments</Text>
              <Text numberOfLines={2} style={styles.description}>
                Manage future dated payments
              </Text>
            </View>
          </View>
        </RectButton>
        <View style={styles.seperator}></View>
        <View>
          <RectButton onPress={() => navigation.navigate("StandingOrders")}>
            <View style={[styles.itemContainer]}>
              <View style={styles.icon}>
                <Ionicons name="ios-people" size={40} color={colors.primary} />
              </View>
              <View style={styles.main}>
                <Text style={styles.header}>Standing instructions</Text>
                <Text numberOfLines={2} style={styles.description}>
                  Manage standing instructions
                </Text>
              </View>
            </View>
          </RectButton>
        </View>
        <View>
          <RectButton onPress={() => navigation.navigate("DirectDebits")}>
            <View style={[styles.itemContainer]}>
              <View style={styles.icon}>
                <Ionicons name="ios-people" size={40} color={colors.primary} />
              </View>
              <View style={styles.main}>
                <Text style={styles.header}>Direct debits</Text>
                <Text numberOfLines={2} style={styles.description}>
                  Manage direct debits
                </Text>
              </View>
            </View>
          </RectButton>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
    paddingHorizontal: 10
  },
  main: {
    justifyContent: "center",
    flex: 1
  },
  seperator: {
    backgroundColor: "#eee",
    height: 1,
    width: "90%",
    alignSelf: "center"
  },
  header: {
    fontSize: normalize(16)
  },
  description: {
    fontSize: normalize(12),
    color: "#888"
  },
  icon: {
    paddingRight: 10
  },
  sectionHeader: {
    fontSize: normalize(20),
    margin: 15,
    fontWeight: "bold",
    color: "#555"
  }
});
