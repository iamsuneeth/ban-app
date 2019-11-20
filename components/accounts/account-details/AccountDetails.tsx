import React, { useRef } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { Card } from "../../elements/card/Card";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import {
  RectButton,
  BorderlessButton,
  ScrollView
} from "react-native-gesture-handler";
import { useState } from "react";
import { useTransition } from "../../../hooks/animation/useTransition";
import { IAccount, IAccountDetails } from "bank-core/dist/types";
import { Amount } from "../../elements/amount/Amount";
import { NavigationParams } from "react-navigation";
import BottomSheet from "reanimated-bottom-sheet";
import { normalize, normalizeHeight } from "../../../utils/normalize";
import { TransactionContainer } from "../../../containers/TransactionContainer";
const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);

type Props = {
  account: IAccount;
  details: IAccountDetails;
  fetchDetails: Function;
  navigate: (string, NavigationParams) => void;
};

export const AccountDetails = ({
  account,
  details,
  fetchDetails,
  navigate
}: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [animation, setInitial] = useTransition({
    expanded,
    trigger: false
  });

  const sheetRef: React.LegacyRef<BottomSheet> = useRef();
  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, normalizeHeight(250)],
    extrapolate: Animated.Extrapolate.CLAMP
  });

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 5]
  });

  return (
    <View style={styles.container}>
      <View style={{ height: "40%" }}>
        <View style={styles.section}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.secondary}>
              <Text style={styles.secondaryText}>{account.code}</Text>
              <Text style={styles.secondarySeperator}>.</Text>
              <Text style={styles.secondaryText}>{account.accountNumber}</Text>
            </View>
            <Amount
              amount={account.balance.amount}
              currency={account.balance.currency}
              style={{ content: styles.totalAmount }}
              size={30}
            />
          </View>
        </View>
        <Card
          style={{ marginHorizontal: normalize(30), backgroundColor: "tomato" }}
        >
          <View style={styles.row}>
            <Amount
              amount={account.availableBalance.amount}
              currency={account.availableBalance.currency}
              style={{ content: styles.amount }}
              size={18}
            />
            <Text style={styles.label}>available balance</Text>
          </View>
          <View style={styles.row}>
            <Amount
              amount={account.availableOverdraft.amount}
              currency={account.availableOverdraft.currency}
              style={{ content: styles.amount }}
              size={18}
            />
            <Text style={styles.label}>available overdraft</Text>
          </View>
          <View style={styles.row}>
            <Amount
              amount={account.overdraft.amount}
              currency={account.overdraft.currency}
              style={{ content: styles.amount }}
              size={18}
            />
            <Text style={styles.label}>used overdraft</Text>
          </View>
        </Card>
        <View style={styles.quickLinks}>
          <RectButton
            onPress={() =>
              navigate("Payments", {
                accountId: account.id
              })
            }
            style={styles.quickLinkButton}
          >
            <View
              style={{
                backgroundColor: "#039be5",
                padding: 10,
                height: normalize(40),
                width: normalize(40),
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 5,
                borderRadius: 20
              }}
            >
              <MaterialIcons name="payment" size={20} color="#fff" />
            </View>
            <Text style={styles.quickLinkText}>Pay someone</Text>
          </RectButton>
          <RectButton
            onPress={() =>
              navigate("Transfers", {
                accountId: account.id
              })
            }
            style={styles.quickLinkButton}
          >
            <View
              style={{
                backgroundColor: "#039be5",
                padding: 10,
                height: normalize(40),
                width: normalize(40),
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 5,
                borderRadius: 20
              }}
            >
              <Ionicons name="ios-cash" size={20} color="#fff" />
            </View>
            <Text style={styles.quickLinkText}>Transfer money</Text>
          </RectButton>
          <RectButton
            onPress={() =>
              navigate("Statements", {
                accountId: account.id
              })
            }
            style={styles.quickLinkButton}
          >
            <View
              style={{
                backgroundColor: "#039be5",
                padding: 10,
                height: normalize(40),
                width: normalize(40),
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 5,
                borderRadius: 20
              }}
            >
              <Ionicons name="ios-document" size={20} color="#fff" />
            </View>
            <Text style={styles.quickLinkText}>Statements</Text>
          </RectButton>
          <RectButton onPress={() => {}} style={styles.quickLinkButton}>
            <View
              style={{
                backgroundColor: "#039be5",
                padding: 10,
                height: normalize(40),
                width: normalize(40),
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 5,
                borderRadius: 20
              }}
            >
              <Ionicons name="ios-card" size={20} color="#fff" />
            </View>
            <Text style={styles.quickLinkText}>Debit card</Text>
          </RectButton>
        </View>
      </View>
      {/* <Animated.View style={{ height, ...styles.addnlContainer }}>
          <ScrollView style={styles.scrollContainer}>
            {details && (
              <View style={styles.addnlInnerContainer}>
                <Text style={styles.addnlHeader}>Account & branch details</Text>
                <View style={styles.addnlSection}>
                  <Text style={styles.addnlValue}>{details.code}</Text>
                  <Text style={styles.addnlLabel}>ifsc code</Text>
                </View>
                <View style={styles.addnlSection}>
                  <Text style={styles.addnlValue}>{details.branch.name}</Text>
                  <Text style={styles.addnlLabel}>branch name</Text>
                </View>
                <View style={styles.addnlSection}>
                  <Text style={styles.addnlValue}>
                    {details.branch.address}
                  </Text>
                  <Text style={styles.addnlLabel}>branch address</Text>
                </View>
                <View style={styles.addnlSection}>
                  <Text style={styles.addnlValue}>{details.branch.bic}</Text>
                  <Text style={styles.addnlLabel}>bic</Text>
                </View>
                <View style={styles.addnlSection}>
                  <Text style={styles.addnlValue}>{details.iban}</Text>
                  <Text style={styles.addnlLabel}>iban</Text>
                </View>
              </View>
            )}
          </ScrollView>
        </Animated.View> */}
      <TransactionContainer accountId={account.id} sheetRef={sheetRef} />
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
  scrollContainer: {},
  section: {
    marginBottom: 10
  },
  main: { color: "#333", fontSize: normalize(18), fontWeight: "bold" },
  secondaryText: {
    color: "#fff",
    fontSize: normalize(12)
  },
  secondary: {
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#039be5",
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10
  },
  secondarySeperator: {
    paddingHorizontal: 5,
    color: "#fff",
    fontSize: normalize(12)
  },
  highlight: { color: "#333", fontSize: normalize(18) },
  expandButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: -15
  },
  totalAmount: {
    textAlign: "right",
    fontWeight: "bold"
  },
  label: {
    color: "#fff",
    fontSize: normalize(14),
    textTransform: "capitalize"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 5
  },
  amount: { color: "#fff" },
  quickLinks: {
    flexDirection: "row",
    marginTop: 20,
    marginHorizontal: 20
  },
  quickLinkButton: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 5
  },
  quickLinkText: {
    fontSize: normalize(12),
    alignSelf: "center",
    textAlign: "center",
    color: "#039be5"
  },
  addnlContainer: {
    marginTop: 10
  },
  addnlInnerContainer: {
    flex: 1
  },
  addnlHeader: { fontSize: normalize(18), marginBottom: 15 },
  addnlSection: { marginBottom: 10 },
  addnlLabel: {
    color: "gray",
    fontSize: normalize(14),
    textTransform: "uppercase"
  },
  addnlValue: {
    color: "#333",
    fontSize: normalize(14)
  }
});
