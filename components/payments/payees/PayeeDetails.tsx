import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LetterAvatar } from "../../common/LetterAvatar";
import { NavigationStackProp } from "react-navigation-stack";
import { IPayee } from "bank-core/src/types";
import { SharedElement } from "react-navigation-shared-element";
import { normalize } from "../../../utils/normalize";
import { Card } from "../../elements/card/Card";
import { ThemeColors } from "../../../theme/constants";
import { useTheme } from "react-navigation";
import {
  TouchableWithoutFeedback,
  RectButton
} from "react-native-gesture-handler";
import { Linking } from "expo";

export const PayeeDetails = ({
  navigation
}: {
  navigation: NavigationStackProp;
}) => {
  const payee: IPayee = navigation.getParam("payee");
  const themeColors = ThemeColors[useTheme()];
  const openClearbit = () => {
    Linking.openURL("https://clearbit.com");
  };
  return (
    <View style={styles.container}>
      <SharedElement
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
      </SharedElement>
      <Card style={{ marginTop: 50, elevation: 0, marginHorizontal: 0 }}>
        <View style={{ margin: 5 }}>
          <SharedElement
            id={`${payee.id}payeeName`}
            style={{ alignSelf: "flex-end", width: 250 }}
          >
            <Text style={[styles.header, { color: themeColors.gray }]}>
              {payee.name}
            </Text>
          </SharedElement>
          <View style={{ marginTop: 20 }}>
            <View style={styles.section}>
              <Text style={[styles.label, { color: themeColors.gray }]}>
                Account number
              </Text>
              <SharedElement id={`${payee.id}accountNumber`}>
                <Text style={[styles.value, { color: themeColors.darkGray }]}>
                  {payee.accountNumber}
                </Text>
              </SharedElement>
            </View>
            <View style={styles.section}>
              <Text style={[styles.label, { color: themeColors.gray }]}>
                Code
              </Text>
              <SharedElement id={`${payee.id}code`}>
                <Text style={[styles.value, { color: themeColors.darkGray }]}>
                  {payee.code}
                </Text>
              </SharedElement>
            </View>
            <View style={styles.section}>
              <Text style={[styles.label, { color: themeColors.gray }]}>
                Bank
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={{ uri: payee.bankLogo }}
                  style={{ width: 20, height: 20, marginRight: 5 }}
                />
                <Text style={[styles.value, { color: themeColors.darkGray }]}>
                  {payee.bankName}
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={[styles.label, { color: themeColors.gray }]}>
                Payee type
              </Text>

              <Text style={[styles.value, { color: themeColors.darkGray }]}>
                {payee.type}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContaioner}>
          <RectButton
            onPress={() =>
              navigation.navigate("makePayment", {
                payee
              })
            }
          >
            <View
              style={[
                styles.actionButton,
                { backgroundColor: themeColors.primaryDark }
              ]}
            >
              <Text
                style={[styles.actionButtontext, { color: themeColors.white }]}
              >
                Pay
              </Text>
            </View>
          </RectButton>
          <RectButton>
            <View
              style={[
                styles.actionButton,
                { borderColor: themeColors.primaryDark, borderWidth: 1 }
              ]}
            >
              <Text
                style={[
                  styles.actionButtontext,
                  { color: themeColors.primaryDark }
                ]}
              >
                Edit
              </Text>
            </View>
          </RectButton>
          <RectButton
            onPress={() =>
              navigation.navigate("modal", {
                message: `Do you want to delete ${payee.name}! ?`
              })
            }
          >
            <View
              style={[
                styles.actionButton,
                { borderColor: themeColors.primaryDark, borderWidth: 1 }
              ]}
            >
              <Text
                style={[
                  styles.actionButtontext,
                  { color: themeColors.primaryDark }
                ]}
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
            style={{ width: 14, height: 14, marginRight: 5 }}
            source={{ uri: "https://logo.clearbit.com/clearbit.com" }}
          />
          <Text style={{ fontSize: normalize(14), color: themeColors.gray }}>
            Logos provided by Clearbit
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

PayeeDetails.sharedElements = (
  navigation: NavigationStackProp<{}>,
  otherNavigation,
  showing
) => {
  const id = navigation.getParam("payee").id;
  return [
    {
      id,
      animation: "fade"
    },
    {
      id: `${id}payeeName`,
      animation: "fade"
    },
    {
      id: `${id}code`,
      animation: "fade"
    },
    {
      id: `${id}accountNumber`,
      animation: "fade"
    }
  ];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
