import React, { useReducer, useEffect } from "react";
import { View, Text, KeyboardAvoidingView, Switch, Alert } from "react-native";
import { normalize } from "../../../utils/normalize";
import { useTheme, ThemeColors as RNThemeColors } from "react-navigation";
import { ThemeColors } from "../../../theme/constants";
import { SharedElement } from "react-navigation-shared-element";
import { Input } from "react-native-elements";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { DateTimePicker } from "../../elements/date-picker/DateTimePicker";
import { NavigationStackProp } from "react-navigation-stack";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import { IPaymentDetails } from "bank-core/typescript/types";
import { IPaymentState } from "bank-core/src/types";
import { Amount } from "../../elements/amount/Amount";

const frequencies = [
  {
    key: "never",
    text: "Never",
    value: undefined
  },
  {
    key: "daily",
    text: "Every day",
    value: 10
  },
  {
    key: "weekly",
    text: "Every week",
    value: 20
  },
  {
    key: "biweekly",
    text: "Every 2 weeks",
    value: 30
  },
  {
    key: "monthly",
    text: "Every month",
    value: 40
  },
  {
    key: "quaterly",
    text: "Every quarter",
    value: 50
  },
  {
    key: "halfYearly",
    text: "Every 6 months",
    value: 60
  },
  {
    key: "yearly",
    text: "Every year",
    value: 70
  }
];

type Props = {
  navigation: NavigationStackProp;
  updatePaymentState: (details: IPaymentDetails) => void;
  paymentState: IPaymentState;
  onAccountSelection: any;
};

export const AmountScreen = ({
  navigation,
  updatePaymentState,
  paymentState,
  onAccountSelection
}: Props) => {
  const themeColors = ThemeColors[useTheme()];
  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    {
      amount:
        (paymentState.details.txnAmount &&
          paymentState.details.txnAmount.amount.toString()) ||
        "",
      reference: paymentState.details.reference,
      schedule: paymentState.details.txnStartDate ? true : false,
      paymentDate:
        paymentState.details.txnStartDate &&
        paymentState.details.txnStartDate.toDate(),
      repeat: paymentState.details.frequency,
      endDate:
        paymentState.details.txnEndDate &&
        paymentState.details.txnEndDate.toDate()
    }
  );

  const nextStep = () => {
    updatePaymentState({
      txnAmount: { amount: parseFloat(state.amount), currency: "GBP" },
      schedulePayment: state.schedule,
      reference: state.reference,
      ...(state.paymentDate && { txnStartDate: dayjs(state.paymentDate) }),
      ...(state.repeat && { frequency: state.repeat }),
      ...(state.repeat && state.endDate && { txnEndDate: dayjs(state.endDate) })
    });
    navigation.navigate("reviewScreen");
  };

  const openAccountSelection = () => {
    navigation.navigate("modal", {
      type: "account",
      onAccountSelection,
      snapPoints: [0, "60%"]
    });
  };

  const renderFrequencyList = () => {
    navigation.navigate("modal", {
      type: "custom",
      snapPoints: [0, "60%"],
      renderProp: close => (
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: themeColors.gray,
              marginVertical: 10,
              fontSize: normalize(16)
            }}
          >
            How often should this payment repeat?
          </Text>
          {frequencies.map(item => (
            <View key={item.key}>
              <RectButton
                onPress={() => {
                  setState({ repeat: item });
                  close();
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    paddingVertical: 15,
                    paddingHorizontal: 10
                  }}
                >
                  <Ionicons
                    name="md-time"
                    size={25}
                    color={themeColors.primaryDark}
                  />
                  <Text style={{ fontSize: normalize(16), marginLeft: 10 }}>
                    {item.text}
                  </Text>
                </View>
              </RectButton>
            </View>
          ))}
        </View>
      )
    });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={{
          flex: 1
        }}
      >
        <View style={{ marginHorizontal: 10 }}>
          <Text
            style={{
              fontSize: normalize(14),
              color: themeColors.gray,
              fontWeight: "600",
              marginBottom: 10
            }}
          >
            Account
          </Text>
          <RectButton onPress={openAccountSelection} style={{ height: 40 }}>
            {paymentState.details.account && (
              <View>
                <Text
                  style={{
                    color: themeColors.primaryDark,
                    fontWeight: "bold",
                    fontSize: normalize(18)
                  }}
                >
                  {paymentState.details.account.nickName}
                </Text>

                <Amount
                  amount={paymentState.details.account.availableBalance.amount}
                  size={12}
                  style={{
                    content: {
                      color: themeColors.primaryDark
                    }
                  }}
                  currency={
                    paymentState.details.account.availableBalance.currency
                  }
                />
              </View>
            )}
            {!paymentState.details.account && (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Ionicons
                  name="ios-add"
                  size={24}
                  color={themeColors.primaryDark}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: themeColors.primaryDark,
                    fontSize: normalize(18)
                  }}
                >
                  Select account
                </Text>
              </View>
            )}
          </RectButton>
        </View>
        <View>
          <Input
            placeholder="0.00"
            keyboardType="numeric"
            value={state.amount}
            onChangeText={text => setState({ amount: text })}
            inputStyle={{ fontSize: 40, padding: 5 }}
            inputContainerStyle={{ marginTop: 5 }}
            containerStyle={{ marginVertical: 10 }}
            label="Amount (£)"
          />
          <Input
            autoCapitalize="none"
            value={state.reference}
            autoCorrect={false}
            onChangeText={text => setState({ reference: text })}
            inputContainerStyle={{ marginTop: 5 }}
            label="Reference"
            containerStyle={{ marginVertical: 10 }}
          />
        </View>
        <View style={{ margin: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 10
            }}
          >
            <Text style={{ fontSize: normalize(14) }}>Schedule Payment</Text>
            <Switch
              trackColor={{
                true: themeColors.primary,
                false: themeColors.lightGray
              }}
              value={state.schedule}
              onValueChange={value => setState({ schedule: value })}
            />
          </View>
          {state.schedule && (
            <>
              <DateTimePicker
                displayComponent={
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginVertical: 10
                    }}
                  >
                    <Text style={{ fontSize: normalize(14) }}>
                      Payment date
                    </Text>
                    <Text
                      style={{
                        textTransform: "uppercase",
                        fontSize: normalize(14),
                        color: themeColors.primaryDark,
                        fontWeight: "500"
                      }}
                    >
                      {(state.paymentDate &&
                        state.paymentDate.toDateString()) ||
                        new Date().toDateString()}
                    </Text>
                  </View>
                }
                minimumDate={new Date()}
                date={state.paymentDate}
                onConfirm={value => setState({ paymentDate: value })}
              />
              <RectButton onPress={renderFrequencyList}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 10
                  }}
                >
                  <Text style={{ fontSize: normalize(14) }}>Repeat</Text>

                  <Text
                    style={{
                      textTransform: "uppercase",
                      fontSize: normalize(14),
                      color: themeColors.primaryDark,
                      fontWeight: "500"
                    }}
                  >
                    {(state.repeat && state.repeat.text) || "Never"}
                  </Text>
                </View>
              </RectButton>
              {state.repeat && !!state.repeat.value && (
                <DateTimePicker
                  displayComponent={
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginVertical: 10
                      }}
                    >
                      <Text style={{ fontSize: normalize(14) }}>
                        Stop repeating
                      </Text>
                      <Text
                        style={{
                          textTransform: "uppercase",
                          fontSize: normalize(14),
                          color: themeColors.primaryDark,
                          fontWeight: "500"
                        }}
                      >
                        {(state.endDate && state.endDate.toDateString()) ||
                          "Never"}
                      </Text>
                    </View>
                  }
                  date={state.endDate}
                  minimumDate={dayjs(state.paymentDate)
                    .add(1, "day")
                    .toDate()}
                  onConfirm={value => setState({ endDate: value })}
                />
              )}
            </>
          )}
        </View>
      </View>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          paddingTop: 20,
          justifyContent: "flex-end",
          paddingBottom: 20,
          backgroundColor: "#fff"
        }}
        enabled
        behavior="position"
        keyboardVerticalOffset={120}
      >
        <RectButton
          style={{ height: 40, marginHorizontal: 10 }}
          enabled={!!state.amount}
          onPress={nextStep}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              backgroundColor: !!state.amount
                ? themeColors.primary
                : themeColors.gray
            }}
          >
            <Text
              style={{
                color: themeColors.white,
                textTransform: "uppercase",
                fontWeight: "bold"
              }}
            >
              Continue
            </Text>
          </View>
        </RectButton>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
