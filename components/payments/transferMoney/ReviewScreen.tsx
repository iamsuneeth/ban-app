import React from "react";
import { View, Text } from "react-native";
import { ThemeColors } from "../../../theme/constants";
import { useTheme } from "react-navigation";
import { normalize } from "../../../utils/normalize";
import { IPaymentState } from "bank-core/typescript/types";
import { Amount } from "../../elements/amount/Amount";
import { SharedElement } from "react-navigation-shared-element";
import { LetterAvatar } from "../../common/LetterAvatar";
import { Ionicons } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

type Props = {
  paymentState: IPaymentState;
  initiatePayment: (authRequired: boolean) => void;
};

export const ReviewScreen = ({ paymentState, initiatePayment }: Props) => {
  const themeColors = ThemeColors[useTheme()];
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
      <View>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Amount
            amount={paymentState.details.txnAmount.amount}
            style={{
              content: {
                fontWeight: "400"
              }
            }}
            size={50}
            currency={paymentState.details.txnAmount.currency}
          />
        </View>
        <View
          style={{
            padding: 10,
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
                color: themeColors.darkGray,
                textAlign: "center",
                fontSize: normalize(14)
              }}
            >
              {paymentState.details.account.nickName}
            </Text>
            <Text
              style={{
                color: themeColors.gray,
                fontSize: normalize(12),
                marginTop: 5
              }}
            >
              {`${paymentState.details.account.code} - ${paymentState.details.account.accountNumber}`}
            </Text>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Ionicons
              name="md-arrow-down"
              size={40}
              color={themeColors.lightGray}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <LetterAvatar
              text={paymentState.details.payee.name}
              size={80}
              viewStyle={{ marginBottom: 0 }}
            />
            <Text
              style={{
                color: themeColors.darkGray,
                fontSize: normalize(14),
                marginTop: 10,
                marginBottom: 5
              }}
            >
              {paymentState.details.payee.name}
            </Text>
            <Text style={{ color: themeColors.gray, fontSize: normalize(12) }}>
              {`${paymentState.details.payee.code} - ${paymentState.details.payee.accountNumber}`}
            </Text>
          </View>
        </View>
        {(paymentState.details.reference ||
          paymentState.details.txnStartDate) && (
          <View style={{ padding: 10 }}>
            <Text
              style={{
                color: themeColors.gray,
                fontSize: normalize(18),
                marginBottom: 10
              }}
            >
              Payment details
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10
              }}
            >
              <Text
                style={{ fontSize: normalize(14), color: themeColors.darkGray }}
              >
                Reference
              </Text>
              <Text
                style={{ fontSize: normalize(14), color: themeColors.gray }}
              >
                {paymentState.details.reference}
              </Text>
            </View>
            {paymentState.details.txnStartDate && (
              <>
                <View
                  style={{
                    backgroundColor: themeColors.lightGray,
                    height: 1,
                    marginVertical: 10
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 10
                  }}
                >
                  <Text
                    style={{
                      fontSize: normalize(14),
                      color: themeColors.darkGray
                    }}
                  >
                    Date
                  </Text>
                  <Text
                    style={{ fontSize: normalize(14), color: themeColors.gray }}
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
                    backgroundColor: themeColors.lightGray,
                    height: 1,
                    marginVertical: 10
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 10
                  }}
                >
                  <Text
                    style={{
                      fontSize: normalize(14),
                      color: themeColors.darkGray
                    }}
                  >
                    Repeats
                  </Text>
                  <Text
                    style={{ fontSize: normalize(14), color: themeColors.gray }}
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
                    backgroundColor: themeColors.lightGray,
                    height: 1,
                    marginVertical: 10
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 10
                  }}
                >
                  <Text
                    style={{
                      fontSize: normalize(14),
                      color: themeColors.darkGray
                    }}
                  >
                    Stop repeating
                  </Text>
                  <Text
                    style={{ fontSize: normalize(14), color: themeColors.gray }}
                  >
                    {paymentState.details.txnEndDate.format("ddd MMM DD YYYY")}
                  </Text>
                </View>
              </>
            )}
          </View>
        )}
      </View>
      <RectButton
        style={{ height: 40, marginHorizontal: 10, marginBottom: 10 }}
        onPress={() => initiatePayment(true)}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            backgroundColor: themeColors.primary
          }}
        >
          <Text
            style={{
              color: themeColors.white,
              textTransform: "uppercase",
              fontWeight: "bold"
            }}
          >
            Confirm
          </Text>
        </View>
      </RectButton>
    </View>
  );
};
