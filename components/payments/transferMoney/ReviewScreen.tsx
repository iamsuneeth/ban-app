import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { IPaymentState } from "bank-core/typescript/types";
import { Amount } from "../../elements/amount/Amount";
import { LetterAvatar } from "../../common/LetterAvatar";
import { Ionicons } from "@expo/vector-icons";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { ThemeType } from "../../../App";
import { normalize } from "../../../utils/normalize";

type Props = {
  paymentState: IPaymentState;
  initiatePayment: (authRequired: boolean) => void;
};

export const ReviewScreen = ({ paymentState, initiatePayment }: Props) => {
  const { colors } = useTheme() as ThemeType;
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      {paymentState.details && (
        <View>
          <View
            style={{ alignItems: "center", marginTop: normalize(10, "height") }}
          >
            <Amount
              amount={paymentState.details.txnAmount.amount}
              style={{
                content: {
                  fontWeight: "400",
                  color: colors.text
                }
              }}
              size={50}
              currency={paymentState.details.txnAmount.currency}
            />
          </View>
          <View
            style={{
              padding: normalize(10),
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <View style={{ marginVertical: normalize(10, "height") }}>
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  fontSize: normalize(14)
                }}
              >
                {paymentState.details.account.nickName}
              </Text>
              <Text
                style={{
                  color: colors.textSecondary,
                  fontSize: normalize(12),
                  marginTop: normalize(5, "height")
                }}
              >
                {`${paymentState.details.account.code} - ${paymentState.details.account.accountNumber}`}
              </Text>
            </View>
            <View style={{ marginVertical: normalize(10, "height") }}>
              <Ionicons name="md-arrow-down" size={40} color={colors.text} />
            </View>
            <View style={{ alignItems: "center" }}>
              <LetterAvatar
                text={paymentState.details.payee.name}
                size={80}
                viewStyle={{ marginBottom: normalize(0, "height") }}
              />
              <Text
                style={{
                  color: colors.text,
                  fontSize: normalize(14),
                  marginTop: normalize(10, "height"),
                  marginBottom: normalize(5, "height")
                }}
              >
                {paymentState.details.payee.name}
              </Text>
              <Text
                style={{ color: colors.textSecondary, fontSize: normalize(12) }}
              >
                {`${paymentState.details.payee.code} - ${paymentState.details.payee.accountNumber}`}
              </Text>
            </View>
          </View>
          {(paymentState.details.reference ||
            paymentState.details.txnStartDate) && (
            <View style={{ padding: normalize(10) }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: normalize(18),
                  marginBottom: normalize(10, "height")
                }}
              >
                Payment details
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: normalize(10, "height")
                }}
              >
                <Text
                  style={{
                    fontSize: normalize(14),
                    color: colors.textSecondary
                  }}
                >
                  Reference
                </Text>
                <Text style={{ fontSize: normalize(14), color: colors.text }}>
                  {paymentState.details.reference}
                </Text>
              </View>
              {paymentState.details.txnStartDate && (
                <>
                  <View
                    style={{
                      backgroundColor: colors.seperator,
                      height: normalize(1, "height"),
                      marginVertical: normalize(10, "height")
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginVertical: normalize(10, "height")
                    }}
                  >
                    <Text
                      style={{
                        fontSize: normalize(14),
                        color: colors.textSecondary
                      }}
                    >
                      Date
                    </Text>
                    <Text
                      style={{ fontSize: normalize(14), color: colors.text }}
                    >
                      {paymentState.details.txnStartDate.format(
                        "ddd MMM DD YYYY"
                      )}
                    </Text>
                  </View>
                </>
              )}
              {paymentState.details.frequency && (
                <>
                  <View
                    style={{
                      backgroundColor: colors.seperator,
                      height: normalize(1, "height"),
                      marginVertical: normalize(10, "height")
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginVertical: normalize(10, "height")
                    }}
                  >
                    <Text
                      style={{
                        fontSize: normalize(14),
                        color: colors.textSecondary
                      }}
                    >
                      Repeats
                    </Text>
                    <Text
                      style={{ fontSize: normalize(14), color: colors.text }}
                    >
                      {paymentState.details.frequency.text}
                    </Text>
                  </View>
                </>
              )}
              {paymentState.details.txnEndDate && (
                <>
                  <View
                    style={{
                      backgroundColor: colors.seperator,
                      height: normalize(1, "height"),
                      marginVertical: normalize(10, "height")
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginVertical: normalize(10, "height")
                    }}
                  >
                    <Text
                      style={{
                        fontSize: normalize(14),
                        color: colors.textSecondary
                      }}
                    >
                      Stop repeating
                    </Text>
                    <Text
                      style={{ fontSize: normalize(14), color: colors.text }}
                    >
                      {paymentState.details.txnEndDate.format(
                        "ddd MMM DD YYYY"
                      )}
                    </Text>
                  </View>
                </>
              )}
            </View>
          )}
        </View>
      )}
      <RectButton
        style={{
          height: normalize(40, "height"),
          marginHorizontal: normalize(10),
          marginBottom: normalize(10, "height")
        }}
        onPress={() => initiatePayment(true)}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            backgroundColor: colors.primary
          }}
        >
          <Text
            style={{
              color: colors.textOnPrimary,
              textTransform: "uppercase",
              fontWeight: "bold"
            }}
          >
            Confirm
          </Text>
        </View>
      </RectButton>
    </ScrollView>
  );
};
