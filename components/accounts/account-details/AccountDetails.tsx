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
import {
  RectButton,
  BorderlessButton,
  State,
  TouchableWithoutFeedback
} from "react-native-gesture-handler";
import { useState } from "react";

import { IAccount, IAccountDetails } from "bank-core/dist/types";
import { Amount } from "../../elements/amount/Amount";
import {
  NavigationParams,
  NavigationProp,
  useTheme,
  ScrollView
} from "react-navigation";

import { normalize, normalizeHeight } from "../../../utils/normalize";
import { TransactionContainer } from "../../../containers/TransactionContainer";
import { SharedElement } from "react-navigation-shared-element";
import { NavigationStackProp } from "react-navigation-stack";
import { ThemeColors } from "../../../theme/constants";
import { useTransition } from "../../../hooks/animation/useTransition";

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

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
  const [open, setOpen] = useState(false);
  const themeColors = ThemeColors[useTheme()];

  // const height = new Value(60);

  const onPress = () => {
    markInitialized();
    setOpen(!open);
  };

  // useCode(() => {
  //   if (open === "open" || open === "close") {
  //     return runSpring(height, SpringUtils.makeDefaultConfig());
  //   }
  //   return height;
  // }, [open]);

  const [animation, markInitialized, initial] = useTransition({
    expanded: open,
    trigger: false
  });

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
    extrapolateLeft: Animated.Extrapolate.CLAMP
  });

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 90]
  });

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: "center", paddingTop: 10 }}>
          <SharedElement
            id={account.id}
            style={{
              height: screenHeight * 0.2,
              width: screenWidth * 0.8
            }}
          >
            <Card
              style={[
                styles.accountCard,
                {
                  backgroundColor: themeColors.primary
                }
              ]}
            >
              <View style={styles.accountPrimary}>
                <View>
                  <Text style={styles.main}>{account.nickName}</Text>
                  <Text style={styles.secondary}>
                    {account.code + " " + account.accountNumber}
                  </Text>
                  <Text style={styles.secondary}>{account.type}</Text>
                </View>
                <View style={{ alignSelf: "flex-end" }}>
                  <Amount
                    amount={account.balance.amount}
                    currency={account.balance.currency}
                    style={{ content: { color: "#fff" } }}
                    size={25}
                  />
                </View>
              </View>
            </Card>
          </SharedElement>
        </View>
        <View style={styles.quickLinks}>
          <BorderlessButton
            onPress={() =>
              navigate("makePayment", {
                accountId: account.id
              })
            }
            testID="quick-link-payments"
            style={styles.quickLinkButton}
          >
            <View
              style={{
                backgroundColor: themeColors.primary,
                borderRadius: 20,
                height: 40,
                width: 40,
                padding: 10,
                marginBottom: 5,
                alignItems: "center",
                elevation: 6,
                shadowOffset: {
                  width: 1,
                  height: 1
                },
                shadowRadius: 3,
                shadowOpacity: 1,
                shadowColor: "#ccc"
              }}
            >
              <MaterialIcons name="payment" size={20} color="#fff" />
            </View>
            <Text style={styles.quickLinkText}>Pay</Text>
          </BorderlessButton>
          <BorderlessButton
            onPress={() =>
              navigate("Statements", {
                accountId: account.id
              })
            }
            testID="quick-link-statements"
            style={styles.quickLinkButton}
          >
            <View
              style={{
                backgroundColor: themeColors.white,
                borderRadius: 20,
                height: 40,
                width: 40,
                padding: 10,
                alignItems: "center",
                marginBottom: 5,
                elevation: 6,
                shadowOffset: {
                  width: 1,
                  height: 1
                },
                shadowRadius: 3,
                shadowOpacity: 1,
                shadowColor: "#ccc"
              }}
            >
              <Ionicons
                name="ios-document"
                size={20}
                color={themeColors.gray}
              />
            </View>
            <Text style={styles.quickLinkText}>Statements</Text>
          </BorderlessButton>
          <BorderlessButton
            onPress={() => {}}
            style={styles.quickLinkButton}
            testID="quick-link-debitcard"
          >
            <View
              style={{
                backgroundColor: themeColors.white,
                borderRadius: 20,
                height: 40,
                width: 40,
                padding: 10,
                alignItems: "center",
                marginBottom: 5,
                elevation: 6,
                shadowOffset: {
                  width: 1,
                  height: 1
                },
                shadowRadius: 3,
                shadowOpacity: 1,
                shadowColor: "#ccc"
              }}
            >
              <Ionicons name="ios-card" size={20} color={themeColors.gray} />
            </View>

            <Text style={styles.quickLinkText}>Debit card</Text>
          </BorderlessButton>
        </View>
        <Animated.View>
          {details && (
            <Card style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={onPress}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={[
                      styles.amountDetailsHeader,
                      {
                        color: themeColors.darkGray,
                        textAlignVertical: "center"
                      }
                    ]}
                  >
                    Balance details
                  </Text>
                  <AnimatedIcon
                    name="ios-arrow-forward"
                    size={25}
                    style={{
                      marginRight: 5,
                      transform: [
                        {
                          rotate: Animated.concat(rotation, "deg")
                        }
                      ]
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
              <Animated.View style={{ height, overflow: "hidden" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 10
                  }}
                >
                  <Text
                    style={[styles.addnlLabel, { color: themeColors.gray }]}
                  >
                    Available balance
                  </Text>
                  <Amount
                    amount={details.availableBalance.amount}
                    currency={details.availableBalance.currency}
                    size={16}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 10
                  }}
                >
                  <Text
                    style={[styles.addnlLabel, { color: themeColors.gray }]}
                  >
                    Actual balance
                  </Text>
                  <Amount
                    amount={details.balance.amount}
                    currency={details.balance.currency}
                    size={16}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 10
                  }}
                >
                  <Text
                    style={[styles.addnlLabel, { color: themeColors.gray }]}
                  >
                    Overdraft
                  </Text>
                  <Amount
                    amount={details.overdraft.amount}
                    currency={details.overdraft.currency}
                    size={16}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 10
                  }}
                >
                  <Text
                    style={[styles.addnlLabel, { color: themeColors.gray }]}
                  >
                    Available overdraft
                  </Text>
                  <Amount
                    amount={details.availableOverdraft.amount}
                    currency={details.availableOverdraft.currency}
                    size={16}
                  />
                </View>
              </Animated.View>
            </Card>
          )}
        </Animated.View>
        <Animated.View style={{ ...styles.addnlContainer }}>
          {details && (
            <Card style={{ borderRadius: 3 }}>
              <Text
                style={[
                  styles.addnlHeader,
                  {
                    color: themeColors.darkGray
                  }
                ]}
              >
                Details
              </Text>
              <View style={styles.addnlSection}>
                <Text
                  style={[styles.addnlValue, { color: themeColors.darkGray }]}
                >
                  {details.accountNumber}
                </Text>
                <Text style={[styles.addnlLabel, { color: themeColors.gray }]}>
                  Account number
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: themeColors.seperatorColor,
                  height: 1,
                  marginBottom: 10
                }}
              />
              <View style={styles.addnlSection}>
                <Text
                  style={[styles.addnlValue, { color: themeColors.darkGray }]}
                >
                  {details.code}
                </Text>
                <Text style={[styles.addnlLabel, { color: themeColors.gray }]}>
                  Ifsc code
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: themeColors.seperatorColor,
                  height: 1,
                  marginBottom: 10
                }}
              />
              <View style={styles.addnlSection}>
                <Text
                  style={[styles.addnlValue, { color: themeColors.darkGray }]}
                >
                  {details.branch.name}
                </Text>
                <Text style={[styles.addnlLabel, { color: themeColors.gray }]}>
                  Branch name
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: themeColors.seperatorColor,
                  height: 1,
                  marginBottom: 10
                }}
              />
              <View style={styles.addnlSection}>
                <Text
                  style={[styles.addnlValue, { color: themeColors.darkGray }]}
                >
                  {details.branch.address}
                </Text>
                <Text style={[styles.addnlLabel, { color: themeColors.gray }]}>
                  Branch address
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: themeColors.seperatorColor,
                  height: 1,
                  marginBottom: 10
                }}
              />
              <View style={styles.addnlSection}>
                <Text
                  style={[styles.addnlValue, { color: themeColors.darkGray }]}
                >
                  {details.branch.bic}
                </Text>
                <Text style={[styles.addnlLabel, { color: themeColors.gray }]}>
                  BIC
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: themeColors.seperatorColor,
                  height: 1,
                  marginBottom: 10
                }}
              />
              <View style={styles.addnlSection}>
                <Text
                  style={[styles.addnlValue, { color: themeColors.darkGray }]}
                >
                  {details.iban}
                </Text>
                <Text style={[styles.addnlLabel, { color: themeColors.gray }]}>
                  IBAN
                </Text>
              </View>
            </Card>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  accountCard: {
    padding: 0,
    flex: 1
  },
  accountPrimary: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between"
  },
  scrollContainer: {},
  section: {
    marginBottom: 10
  },
  main: { color: "#fff", fontSize: normalize(16) },
  secondary: { color: "#fff", fontSize: normalize(12) },
  highlight: { color: "#fff", fontSize: normalize(18) },
  secondaryText: {
    color: "#fff",
    fontSize: normalize(12)
  },
  secondarySeperator: {
    paddingHorizontal: 5,
    color: "#fff",
    fontSize: normalize(12)
  },
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
    alignSelf: "center",
    width: screenWidth * 0.8,
    padding: 5
  },
  quickLinkButton: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5
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
  addnlHeader: {
    fontSize: normalize(14),
    marginBottom: 15,
    fontWeight: "bold"
  },
  amountDetailsHeader: {
    fontSize: normalize(14),
    fontWeight: "bold"
  },
  addnlSection: { marginBottom: 10 },
  addnlLabel: {
    fontSize: normalize(14),
    marginVertical: 5
  },
  addnlValue: {
    fontSize: normalize(14)
  }
});
