import React, { useReducer } from "react";
import { View, Text, KeyboardAvoidingView, Switch, Alert } from "react-native";
;
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { DateTimePicker } from "../../elements/date-picker/DateTimePicker";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import { IPaymentDetails } from "bank-core/typescript/types";
import { IPaymentState } from "bank-core/src/types";
import { Amount } from "../../elements/amount/Amount";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentParamList } from "../../../stacks/PaymentStack";
import { useTheme } from "@react-navigation/native";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../../../tabs/BottomTabBar";
import { TextInput } from "react-native-paper";
import { TrackingState } from "expo/build/AR";

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
  navigation: CompositeNavigationProp<
    StackNavigationProp<PaymentParamList, "AmountScreen">,
    BottomTabNavigationProp<BottomTabParamList>
  >;
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
  const { colors } = useTheme();
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
    navigation.navigate("ReviewScreen");
  };

  const openAccountSelection = () => {
    navigation.navigate("Modal", {
      type: "account",
      onAccountSelection,
      snapPoints: [0, "60%"]
    });
  };

  const renderFrequencyList = () => {
    navigation.navigate("Modal", {
      type: "custom",
      snapPoints: [0, "60%"],
      renderProp: close => (
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: colors.text,
              marginVertical: 10,
              fontSize: 16
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
                  <Ionicons name="md-time" size={25} color={colors.primary} />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      color: colors.text
                    }}
                  >
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
              fontSize: 14,
              color: colors.text,
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
                    color: colors.primary,
                    fontWeight: "bold",
                    fontSize: 18
                  }}
                >
                  {paymentState.details.account.nickName}
                </Text>

                <Amount
                  amount={paymentState.details.account.availableBalance.amount}
                  size={12}
                  style={{
                    content: {
                      color: colors.primary
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
                <Ionicons name="ios-add" size={24} color={colors.primary} />
                <Text
                  style={{
                    marginLeft: 5,
                    color: colors.primary,
                    fontSize: 18
                  }}
                >
                  Select account
                </Text>
              </View>
            )}
          </RectButton>
        </View>
        <View>
          <TextInput
            label="Amount (£)"
            style={{ margin: 5 }}
            theme={{
              colors: {
                background: "transparent"
              }
            }}
            autoCapitalize="none"
            autoCorrect={false}
            value={state.amount}
            onChangeText={text => setState({ amount: text })}
          />
          <TextInput
            label="Reference"
            style={{ margin: 5 }}
            autoCapitalize="none"
            autoCorrect={false}
            theme={{
              colors: {
                background: "transparent"
              }
            }}
            value={state.reference}
            onChangeText={text => setState({ reference: text })}
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
            <Text style={{ fontSize: 14, color: colors.text }}>
              Schedule Payment
            </Text>
            <Switch
              trackColor={{
                true: colors.primary,
                false: colors.text
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
                    <Text
                      style={{ fontSize: 14, color: colors.text }}
                    >
                      Payment date
                    </Text>
                    <Text
                      style={{
                        textTransform: "uppercase",
                        fontSize: 14,
                        color: colors.primary,
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
                  <Text style={{ fontSize: 14, color: colors.text }}>
                    Repeat
                  </Text>

                  <Text
                    style={{
                      textTransform: "uppercase",
                      fontSize: 14,
                      color: colors.primary,
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
                      <Text
                        style={{ fontSize: 14, color: colors.text }}
                      >
                        Stop repeating
                      </Text>
                      <Text
                        style={{
                          textTransform: "uppercase",
                          fontSize: 14,
                          color: colors.primary,
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
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          marginBottom: 40
        }}
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
              backgroundColor: !!state.amount ? colors.primary : colors.text
            }}
          >
            <Text
              style={{
                color: "#fff",
                textTransform: "uppercase",
                fontWeight: "bold"
              }}
            >
              Continue
            </Text>
          </View>
        </RectButton>
      </View>
    </ScrollView>
  );
};
