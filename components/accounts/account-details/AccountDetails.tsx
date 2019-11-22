import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  LayoutChangeEvent
} from "react-native";
import Animated from "react-native-reanimated";
import { Card } from "../../elements/card/Card";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { useState } from "react";

import { IAccount, IAccountDetails } from "bank-core/dist/types";
import { Amount } from "../../elements/amount/Amount";
import { NavigationParams } from "react-navigation";

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
  const [mainHeight, setMainHeight] = useState(0);

  const setHeight = (event: LayoutChangeEvent) => {
    setMainHeight(event.nativeEvent.layout.height);
  };

  return (
    <View style={styles.container}>
      <View onLayout={setHeight}>
        <Card
          style={{
            marginHorizontal: normalize(15),
            marginBottom: 0,
            backgroundColor: "tomato"
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Amount
              amount={account.balance.amount}
              currency={account.balance.currency}
              style={{ content: styles.totalAmount }}
              size={30}
            />
            <View style={styles.secondary}>
              <Text style={styles.secondaryText}>{account.type}</Text>
              <Text style={styles.secondarySeperator}>|</Text>
              <Text style={styles.secondaryText}>{account.code}</Text>
              <Text style={styles.secondarySeperator}>|</Text>
              <Text style={styles.secondaryText}>{account.accountNumber}</Text>
            </View>
          </View>
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
            <MaterialIcons name="payment" size={20} color="#fff" />
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
            <Ionicons name="ios-cash" size={20} color="#fff" />

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
            <Ionicons name="ios-document" size={20} color="#fff" />

            <Text style={styles.quickLinkText}>Statements</Text>
          </RectButton>
          <RectButton onPress={() => {}} style={styles.quickLinkButton}>
            <Ionicons name="ios-card" size={20} color="#fff" />

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
      {mainHeight > 0 && (
        <TransactionContainer accountId={account.id} height={mainHeight} />
      )}
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
    fontWeight: "bold",
    color: "#fff"
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
    marginHorizontal: normalize(25),
    padding: 5,
    minHeight: normalizeHeight(50),
    backgroundColor: "#039be5",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  quickLinkButton: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
    //marginHorizontal: 5
  },
  quickLinkText: {
    fontSize: normalize(12),
    alignSelf: "center",
    textAlign: "center",
    color: "#fff"
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
