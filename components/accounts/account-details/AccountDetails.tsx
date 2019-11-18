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
      <Card style={styles.accountCard}>
        <View style={styles.section}>
          <View>
            <Text style={styles.main}>{account.nickName}</Text>
            <Text style={styles.secondary}>
              {`${account.type}|${account.code}|${account.accountNumber}`}
            </Text>
          </View>
          <Amount
            amount={account.balance.amount}
            currency={account.balance.currency}
            style={{ content: styles.totalAmount }}
            size={25}
          />
        </View>
        <View>
          <View style={styles.row}>
            <Text style={styles.label}>available balance</Text>
            <Amount
              amount={account.availableBalance.amount}
              currency={account.availableBalance.currency}
              style={{ content: styles.amount }}
              size={14}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>available overdraft</Text>

            <Amount
              amount={account.availableOverdraft.amount}
              currency={account.availableOverdraft.currency}
              style={{ content: styles.amount }}
              size={14}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>used overdraft</Text>

            <Amount
              amount={account.overdraft.amount}
              currency={account.overdraft.currency}
              style={{ content: styles.amount }}
              size={14}
            />
          </View>
        </View>
        <View style={styles.quickLinks}>
          <RectButton
            onPress={() =>
              navigate("Payments", {
                accountId: account.id
              })
            }
            style={styles.quickLinkButton}
          >
            <MaterialIcons name="payment" size={25} />
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
            <Ionicons name="ios-cash" size={25} />
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
            <Ionicons name="ios-document" size={25} />
            <Text style={styles.quickLinkText}>Statements</Text>
          </RectButton>
          <RectButton onPress={() => {}} style={styles.quickLinkButton}>
            <Ionicons name="ios-card" size={25} />
            <Text style={styles.quickLinkText}>Debit card</Text>
          </RectButton>
        </View>
        <Animated.View style={{ height, ...styles.addnlContainer }}>
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
        </Animated.View>
        <BorderlessButton
          onPress={() => {
            setInitial();
            if (sheetRef.current) {
              if (expanded) {
                sheetRef.current.snapTo(1);
              } else {
                sheetRef.current.snapTo(2);
              }
            }
            setExpanded(state => !state);
          }}
          style={styles.expandButton}
          enabled={details ? true : false}
        >
          <AnimatedIcon
            name="downcircle"
            size={30}
            color="tomato"
            style={{ transform: [{ rotate: rotation }] }}
          />
        </BorderlessButton>
      </Card>
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
  secondary: { color: "gray", fontSize: normalize(12) },
  highlight: { color: "#333", fontSize: normalize(18) },
  expandButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: -15
  },
  totalAmount: {
    color: "#333",
    textAlign: "right"
  },
  label: {
    color: "gray",
    fontSize: normalize(14),
    textTransform: "capitalize"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  amount: { color: "#333" },
  quickLinks: {
    flexDirection: "row",
    marginTop: 20
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
    textAlign: "center"
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
