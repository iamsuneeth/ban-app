import React, { useRef } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { Card } from "../../elements/card/Card";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import {
  BorderlessButton,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native-gesture-handler";
import { useState } from "react";

import { Amount } from "../../elements/amount/Amount";

import { useTransition } from "../../../hooks/animation/useTransition";
import { IAccount, IAccountDetails } from "bank-core/src/types";
import {
  useTheme,
  useNavigation,
  CompositeNavigationProp,
  CommonActions
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeParamList } from "../../../stacks/HomeStack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../../../tabs/BottomTabBar";
import { ThemeType } from "../../../App";
import { normalize } from "../../../utils/normalize";

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

type Props = {
  account: IAccount;
  details: IAccountDetails;
  fetchDetails: Function;
};

type AccountDetailsNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeParamList, "AccountDetails">,
  BottomTabNavigationProp<BottomTabParamList>
>;

export const AccountDetails = ({ account, details }: Props) => {
  const [open, setOpen] = useState(false);
  const { colors, dark } = useTheme() as ThemeType;
  const navigation = useNavigation<AccountDetailsNavigationProp>();
  const onPress = () => {
    markInitialized();
    setOpen(!open);
  };

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
        <View
          style={{ alignItems: "center", paddingTop: normalize(10, "height") }}
        >
          {/* <SharedElement
            id={account.id}
            style={{
              height: screenHeight * 0.2,
              width: screenWidth * 0.8
            }}
          > */}
          <Card
            style={[
              styles.accountCard,
              {
                backgroundColor: colors.primaryDark,
                height: screenHeight * 0.2,
                width: screenWidth * 0.8
              },
              dark && { shadowColor: colors.shadowColor }
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
          {/* </SharedElement> */}
        </View>
        <View style={styles.quickLinks}>
          <BorderlessButton
            onPress={() =>
              navigation.dispatch(
                CommonActions.navigate("PayeeSelectionScreen", {
                  account
                })
              )
            }
            testID="quick-link-payments"
            style={styles.quickLinkButton}
          >
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: normalize(25),
                height: normalize(50),
                width: normalize(50),
                padding: normalize(10),
                marginBottom: normalize(5, "height"),
                alignItems: "center",
                elevation: 6,
                shadowOffset: {
                  width: normalize(1),
                  height: 1
                },
                shadowRadius: 3,
                shadowOpacity: 1,
                shadowColor: colors.shadowColor,
                justifyContent: "center"
              }}
            >
              <MaterialIcons name="payment" size={25} color="#fff" />
            </View>
            <Text style={[styles.quickLinkText, { color: colors.text }]}>
              Pay
            </Text>
          </BorderlessButton>
          <BorderlessButton
            onPress={() =>
              navigation.navigate("Statements", {
                accountId: account.id
              })
            }
            testID="quick-link-statements"
            style={styles.quickLinkButton}
          >
            <View
              style={{
                borderWidth: 1,
                backgroundColor: colors.background,
                borderColor: colors.primary,
                borderRadius: normalize(25),
                height: normalize(50),
                width: normalize(50),
                padding: normalize(10),
                alignItems: "center",
                elevation: 1,
                marginBottom: normalize(5, "height"),

                shadowOffset: {
                  width: normalize(1),
                  height: 1
                },
                shadowRadius: 3,
                shadowOpacity: 1,
                shadowColor: colors.shadowColor,
                justifyContent: "center"
              }}
            >
              <Ionicons name="ios-document" size={25} color={colors.primary} />
            </View>
            <Text style={[styles.quickLinkText, { color: colors.text }]}>
              Statements
            </Text>
          </BorderlessButton>
          <BorderlessButton
            onPress={() => {}}
            style={styles.quickLinkButton}
            testID="quick-link-debitcard"
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.primary,
                borderRadius: normalize(25),
                backgroundColor: colors.background,
                height: normalize(50),
                width: normalize(50),
                padding: normalize(10),
                alignItems: "center",
                marginBottom: normalize(5, "height"),

                shadowOffset: {
                  width: normalize(1),
                  height: 1
                },
                shadowRadius: 3,
                shadowOpacity: 1,
                shadowColor: colors.shadowColor,
                justifyContent: "center"
              }}
            >
              <Ionicons name="ios-card" size={25} color={colors.primary} />
            </View>

            <Text style={[styles.quickLinkText, { color: colors.text }]}>
              Debit card
            </Text>
          </BorderlessButton>
        </View>
        <Animated.View>
          {details && (
            <Card
              style={{
                flex: 1,
                shadowColor: colors.shadowColor,
                backgroundColor: colors.surface
              }}
            >
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
                        color: colors.text,
                        textAlignVertical: "center"
                      }
                    ]}
                  >
                    Balance details
                  </Text>
                  <AnimatedIcon
                    name="ios-arrow-forward"
                    size={25}
                    color={colors.text}
                    style={{
                      marginRight: normalize(5),
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
                    marginVertical: normalize(10, "height")
                  }}
                >
                  <Text
                    style={[styles.addnlLabel, { color: colors.textSecondary }]}
                  >
                    Available balance
                  </Text>
                  <Amount
                    amount={account.availableBalance.amount}
                    currency={account.availableBalance.currency}
                    style={{
                      content: { color: colors.text }
                    }}
                    size={16}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: normalize(10, "height")
                  }}
                >
                  <Text
                    style={[styles.addnlLabel, { color: colors.textSecondary }]}
                  >
                    Actual balance
                  </Text>
                  <Amount
                    amount={account.balance.amount}
                    currency={account.balance.currency}
                    style={{
                      content: { color: colors.text }
                    }}
                    size={16}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: normalize(10, "height")
                  }}
                >
                  <Text
                    style={[styles.addnlLabel, { color: colors.textSecondary }]}
                  >
                    Overdraft
                  </Text>
                  <Amount
                    amount={account.overdraft.amount}
                    currency={account.overdraft.currency}
                    style={{
                      content: { color: colors.text }
                    }}
                    size={16}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: normalize(10, "height")
                  }}
                >
                  <Text
                    style={[styles.addnlLabel, { color: colors.textSecondary }]}
                  >
                    Available overdraft
                  </Text>
                  <Amount
                    amount={account.availableOverdraft.amount}
                    currency={account.availableOverdraft.currency}
                    style={{
                      content: { color: colors.text }
                    }}
                    size={16}
                  />
                </View>
              </Animated.View>
            </Card>
          )}
        </Animated.View>
        <Animated.View style={{ ...styles.addnlContainer }}>
          {details && (
            <Card
              style={{
                borderRadius: 3,
                backgroundColor: colors.surface,
                shadowColor: colors.shadowColor
              }}
            >
              <Text
                style={[
                  styles.addnlHeader,
                  {
                    color: colors.text
                  }
                ]}
              >
                Details
              </Text>
              <View style={styles.addnlSection}>
                <Text style={[styles.addnlValue, { color: colors.text }]}>
                  {account.accountNumber}
                </Text>
                <Text
                  style={[styles.addnlLabel, { color: colors.textSecondary }]}
                >
                  Account number
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: colors.seperator,
                  height: 1,
                  marginBottom: normalize(10, "height")
                }}
              />
              <View style={styles.addnlSection}>
                <Text style={[styles.addnlValue, { color: colors.text }]}>
                  {details.branch.code}
                </Text>
                <Text
                  style={[styles.addnlLabel, { color: colors.textSecondary }]}
                >
                  Branch code
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: colors.seperator,
                  height: 1,
                  marginBottom: normalize(10, "height")
                }}
              />
              <View style={styles.addnlSection}>
                <Text style={[styles.addnlValue, { color: colors.text }]}>
                  {details.branch.name}
                </Text>
                <Text
                  style={[styles.addnlLabel, { color: colors.textSecondary }]}
                >
                  Branch name
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: colors.seperator,
                  height: 1,
                  marginBottom: normalize(10, "height")
                }}
              />
              <View style={styles.addnlSection}>
                <Text style={[styles.addnlValue, { color: colors.text }]}>
                  {details.branch.address}
                </Text>
                <Text
                  style={[styles.addnlLabel, { color: colors.textSecondary }]}
                >
                  Branch address
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: colors.seperator,
                  height: 1,
                  marginBottom: normalize(10, "height")
                }}
              />
              <View style={styles.addnlSection}>
                <Text style={[styles.addnlValue, { color: colors.text }]}>
                  {details.branch.bic}
                </Text>
                <Text
                  style={[styles.addnlLabel, { color: colors.textSecondary }]}
                >
                  BIC
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: colors.seperator,
                  height: 1,
                  marginBottom: normalize(10, "height")
                }}
              />
              <View style={styles.addnlSection}>
                <Text style={[styles.addnlValue, { color: colors.text }]}>
                  {details.iban}
                </Text>
                <Text
                  style={[styles.addnlLabel, { color: colors.textSecondary }]}
                >
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
    flex: 1
  },
  accountCard: {
    padding: normalize(0),
    flex: 1
  },
  accountPrimary: {
    padding: normalize(10),
    flex: 1,
    justifyContent: "space-between"
  },
  scrollContainer: {},
  section: {
    marginBottom: normalize(10, "height")
  },
  main: { color: "#fff", fontSize: normalize(18) },
  secondary: { color: "#fff", fontSize: normalize(13) },
  highlight: { color: "#fff", fontSize: normalize(18) },
  secondaryText: {
    color: "#fff",
    fontSize: normalize(12)
  },
  secondarySeperator: {
    paddingHorizontal: normalize(5),
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
    marginBottom: normalize(5, "height")
  },
  amount: { color: "#fff" },
  quickLinks: {
    flexDirection: "row",
    alignSelf: "center",
    width: screenWidth * 0.8,
    marginVertical: normalize(10, "height")
  },
  quickLinkButton: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: normalize(5)
  },
  quickLinkText: {
    fontSize: normalize(12),
    alignSelf: "center",
    textAlign: "center"
  },
  addnlContainer: {
    marginTop: normalize(10, "height")
  },
  addnlInnerContainer: {
    flex: 1
  },
  addnlHeader: {
    fontSize: normalize(14),
    marginBottom: normalize(15, "height"),
    fontWeight: "bold"
  },
  amountDetailsHeader: {
    fontSize: normalize(14),
    fontWeight: "bold"
  },
  addnlSection: { marginBottom: normalize(10, "height") },
  addnlLabel: {
    fontSize: normalize(14),
    marginVertical: normalize(5, "height")
  },
  addnlValue: {
    fontSize: normalize(14)
  }
});
