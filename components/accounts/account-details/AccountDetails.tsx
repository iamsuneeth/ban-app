import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
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
import { Spacer } from "../../elements/utils/Spacer";
import { Text } from "../../elements/text/Text";
import { PaddedView } from "../../elements/view/PaddedView";
import { Row } from "../../elements/view/Row";
import { Seperator } from "../../elements/view/Seperator";

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center" }}>
          <Spacer type="medium" />
          <Card
            fluid
            style={[
              {
                backgroundColor: dark ? colors.primaryDark : colors.primary,
                height: screenHeight * 0.2,
                width: screenWidth * 0.8
              }
            ]}
          >
            <View style={styles.accountPrimary}>
              <View>
                <Text
                  type="main"
                  style={{
                    color: colors.textOnPrimary
                  }}
                >
                  {account.nickName}
                </Text>
                <Text
                  type="caption"
                  style={{
                    color: colors.textOnPrimary
                  }}
                >
                  {account.code + " " + account.accountNumber}
                </Text>
                <Text
                  style={{
                    color: colors.textOnPrimary
                  }}
                >
                  {account.type}
                </Text>
              </View>
              <View style={{ alignSelf: "flex-end" }}>
                <Amount
                  amount={account.balance.amount}
                  currency={account.balance.currency}
                  style={{ content: { color: colors.textOnPrimary } }}
                  size={25}
                />
              </View>
            </View>
          </Card>
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
            <PaddedView
              size="medium"
              style={{
                backgroundColor: colors.primary,
                shadowColor: colors.shadowColor,
                ...styles.quickLinkIcon
              }}
            >
              <MaterialIcons
                name="payment"
                size={25}
                color={colors.textOnPrimary}
              />
            </PaddedView>
            <Text center>Pay</Text>
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
                ...styles.quickLinkIcon,
                borderWidth: 1,
                backgroundColor: colors.background,
                borderColor: colors.primary,
                shadowColor: colors.shadowColor
              }}
            >
              <Ionicons name="ios-document" size={25} color={colors.primary} />
            </View>
            <Text>Statements</Text>
          </BorderlessButton>
          <BorderlessButton
            onPress={() => {}}
            style={styles.quickLinkButton}
            testID="quick-link-debitcard"
          >
            <View
              style={{
                ...styles.quickLinkIcon,
                borderWidth: 1,
                backgroundColor: colors.background,
                borderColor: colors.primary,
                shadowColor: colors.shadowColor
              }}
            >
              <Ionicons name="ios-card" size={25} color={colors.primary} />
            </View>

            <Text>Debit card</Text>
          </BorderlessButton>
        </View>
        <Animated.View>
          {details && (
            <Card margin>
              <TouchableWithoutFeedback onPress={onPress}>
                <Row>
                  <Text type="main">Balance details</Text>
                  <AnimatedIcon
                    name="ios-arrow-forward"
                    size={25}
                    color={colors.text}
                    style={{
                      transform: [
                        {
                          rotate: Animated.concat(rotation, "deg")
                        }
                      ],
                      marginRight: normalize(5)
                    }}
                  />
                </Row>
              </TouchableWithoutFeedback>
              <Animated.View style={{ height, overflow: "hidden" }}>
                <Row margin vertical size="medium">
                  <Text style={{ color: colors.textSecondary }}>
                    Available balance
                  </Text>
                  <Amount
                    amount={account.availableBalance.amount}
                    currency={account.availableBalance.currency}
                    size={16}
                  />
                </Row>
                <Row margin vertical size="medium">
                  <Text style={[{ color: colors.textSecondary }]}>
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
                </Row>
                <Row margin vertical size="medium">
                  <Text style={[{ color: colors.textSecondary }]}>
                    Overdraft
                  </Text>
                  <Amount
                    amount={account.overdraft.amount}
                    currency={account.overdraft.currency}
                    size={16}
                  />
                </Row>
                <Row margin vertical size="medium">
                  <Text style={[{ color: colors.textSecondary }]}>
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
                </Row>
              </Animated.View>
            </Card>
          )}
        </Animated.View>
        <Animated.View>
          <Spacer type="medium" />
          {details && (
            <Card margin>
              <Text type="main">Details</Text>
              <Spacer type="medium" />
              <View>
                <Text>{account.accountNumber}</Text>
                <Text type="caption">Account number</Text>
              </View>
              <Seperator />
              <View>
                <Text>{details.branch.code}</Text>
                <Text type="caption">Branch code</Text>
              </View>
              <Seperator />
              <View>
                <Text>{details.branch.name}</Text>
                <Text type="caption">Branch name</Text>
              </View>
              <Seperator />
              <View>
                <Text>{details.branch.address}</Text>
                <Text type="caption">Branch address</Text>
              </View>
              <Seperator />
              <View>
                <Text>{details.branch.bic}</Text>
                <Text type="caption">BIC</Text>
              </View>
              <Seperator />
              <View>
                <Text>{details.iban}</Text>
                <Text type="caption">IBAN</Text>
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
  accountPrimary: {
    flex: 1,
    justifyContent: "space-between"
  },
  section: {
    marginBottom: normalize(10, "height")
  },
  main: { color: "#fff", fontSize: normalize(18) },
  secondary: { color: "#fff", fontSize: normalize(13) },
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
  quickLinkIcon: {
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
    justifyContent: "center"
  },
  amountDetailsHeader: {
    fontWeight: "bold",
    textAlignVertical: "center"
  }
});
