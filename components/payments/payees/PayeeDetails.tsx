import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LetterAvatar } from "../../common/LetterAvatar";
import { IPayee } from "bank-core/src/types";
import { Card } from "../../elements/card/Card";
import { useTheme, RouteProp } from "@react-navigation/native";
import {
  TouchableWithoutFeedback,
  RectButton
} from "react-native-gesture-handler";
import { Linking } from "expo";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentParamList } from "../../../stacks/PaymentStack";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../../../tabs/BottomTabBar";
import { ThemeType } from "../../../App";
import { normalize } from "../../../utils/normalize";

export const PayeeDetails = ({
  navigation,
  route
}: {
  navigation: CompositeNavigationProp<
    StackNavigationProp<PaymentParamList, "PayeeDetails">,
    BottomTabNavigationProp<BottomTabParamList>
  >;
  route: RouteProp<PaymentParamList, "PayeeDetails">;
}) => {
  const payee: IPayee = route.params.payee;
  const { colors } = useTheme() as ThemeType;
  const openClearbit = () => {
    Linking.openURL("https://clearbit.com");
  };
  return (
    <View style={styles.container}>
      {/* <SharedElement
        id={payee.id}
        style={{
          width: 100,
          height: 100,
          elevation: 3,
          zIndex: 3,
          top: 10,
          left: 20,
          position: "absolute"
        }}
      >
        <LetterAvatar text={payee.name} size={100} />
      </SharedElement> */}
      <View
        style={{
          width: 100,
          height: 100,
          elevation: 3,
          zIndex: 3,
          top: 10,
          left: 20,
          position: "absolute"
        }}
      >
        <LetterAvatar text={payee.name} size={100} />
      </View>
      <Card
        style={{
          marginTop: 50,
          marginHorizontal: 0,
          backgroundColor: colors.surface,
          shadowColor: colors.shadowColor
        }}
      >
        <View style={{ margin: 5 }}>
          {/* <SharedElement
            id={`${payee.id}payeeName`}
            style={{ alignSelf: "flex-end", width: 250 }}
          >
            <Text style={[styles.header, { color: colors.gray }]}>
              {payee.name}
            </Text>
          </SharedElement> */}
          <View style={{ alignSelf: "flex-end", width: 250 }}>
            <Text style={[styles.header, { color: colors.text }]}>
              {payee.name}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <View style={styles.section}>
              <Text style={[styles.label, { color: colors.text }]}>
                Account number
              </Text>
              {/* <SharedElement id={`${payee.id}accountNumber`}>
                <Text style={[styles.value, { color: colors.darkGray }]}>
                  {payee.accountNumber}
                </Text>
              </SharedElement> */}
              <Text style={[styles.value, { color: colors.text }]}>
                {payee.accountNumber}
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={[styles.label, { color: colors.text }]}>Code</Text>
              {/* <SharedElement id={`${payee.id}code`}>
                <Text style={[styles.value, { color: colors.darkGray }]}>
                  {payee.code}
                </Text>
              </SharedElement> */}

              <Text style={[styles.value, { color: colors.text }]}>
                {payee.code}
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={[styles.label, { color: colors.text }]}>Bank</Text>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: payee.bankLogo }}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 5
                  }}
                />
                <Text style={[styles.value, { color: colors.text }]}>
                  {payee.bankName}
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={[styles.label, { color: colors.text }]}>
                Payee type
              </Text>

              <Text style={[styles.value, { color: colors.text }]}>
                {payee.type}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContaioner}>
          <RectButton
            onPress={() =>
              navigation.navigate("AmountScreen", {
                payee
              })
            }
          >
            <View
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
            >
              <Text style={[styles.actionButtontext, { color: "#fff" }]}>
                Pay
              </Text>
            </View>
          </RectButton>
          <RectButton>
            <View
              style={[
                styles.actionButton,
                { borderColor: colors.primary, borderWidth: 1 }
              ]}
            >
              <Text
                style={[styles.actionButtontext, { color: colors.primary }]}
              >
                Edit
              </Text>
            </View>
          </RectButton>
          <RectButton
            onPress={() =>
              navigation.navigate("Modal", {
                message: `Do you want to delete ${payee.name}! ?`
              })
            }
          >
            <View
              style={[
                styles.actionButton,
                { borderColor: colors.primary, borderWidth: 1 }
              ]}
            >
              <Text
                style={[styles.actionButtontext, { color: colors.primary }]}
              >
                Delete
              </Text>
            </View>
          </RectButton>
        </View>
      </Card>
      <View>
        <TouchableWithoutFeedback
          onPress={openClearbit}
          style={{
            paddingTop: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <Image
            style={{
              width: 14,
              height: 14,
              marginRight: 5
            }}
            source={{ uri: "https://logo.clearbit.com/clearbit.com" }}
          />
          <Text style={{ fontSize: normalize(14), color: colors.text }}>
            Logos provided by Clearbit
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

// PayeeDetails.sharedElements = (
//   navigation: NavigationStackProp<{}>,
//   otherNavigation,
//   showing
// ) => {
//   const id = navigation.getParam("payee").id;
//   return [
//     {
//       id,
//       animation: "fade"
//     },
//     {
//       id: `${id}payeeName`,
//       animation: "fade"
//     },
//     {
//       id: `${id}code`,
//       animation: "fade"
//     },
//     {
//       id: `${id}accountNumber`,
//       animation: "fade"
//     }
//   ];
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  main: {
    justifyContent: "center",
    flex: 1
  },
  icon: {
    paddingRight: 10
  },
  header: {
    fontSize: normalize(25),
    textAlign: "right"
  },
  value: {
    fontSize: normalize(16)
  },
  label: {
    fontSize: normalize(14)
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  buttonContaioner: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  actionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    minWidth: "30%",
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3
  },
  actionButtontext: {
    textAlign: "center",
    fontSize: normalize(14)
  }
});
