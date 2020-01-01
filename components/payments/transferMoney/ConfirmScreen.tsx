import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, BackHandler } from "react-native";
import { usePaymentState } from "bank-core";
import LottieView from "lottie-react-native";
import { normalize } from "react-native-elements";
import { ThemeColors } from "../../../theme/constants";
import { useTheme } from "react-navigation";
import { RectButton } from "react-native-gesture-handler";
import { NavigationStackProp } from "react-navigation-stack";
const { width } = Dimensions.get("window");

type props = {
  navigation: NavigationStackProp;
};
export const ConfirmScreen = ({ navigation }: props) => {
  const { paymentState, clearPaymentState } = usePaymentState();
  const [state] = useState({
    ...paymentState.details,
    reference: paymentState.reference,
    error: paymentState.error,
    status: paymentState.status
  });

  const ref = useRef<LottieView>();
  useEffect(() => {
    clearPaymentState();
    ref.current.play(0, 21);
    BackHandler.addEventListener("hardwareBackPress", () => {
      return navigation.isFocused() ? true : false;
    });
  }, []);
  const themeColors = ThemeColors[useTheme()];
  return (
    <View style={styles.animationContainer}>
      <Text
        style={{
          fontSize: normalize(20),
          marginTop: 10,
          color: themeColors.gray,
          fontWeight: "bold",
          alignSelf: "center"
        }}
      >
        Payment done!!!
      </Text>
      <LottieView
        style={{ alignSelf: "center" }}
        autoSize={true}
        ref={ref}
        loop={false}
        source={require("../../../assets/success.json")}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontSize: normalize(14),
            marginRight: 5,
            color: themeColors.gray
          }}
        >
          Ref:
        </Text>
        <Text
          style={{
            fontSize: normalize(14),
            textTransform: "uppercase",
            fontWeight: "bold",
            color: themeColors.darkGray
          }}
        >
          {state.reference}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 20,
          marginHorizontal: 10,
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: 20
        }}
      >
        <RectButton style={{ width: "80%", height: 40, marginVertical: 5 }}>
          <View
            style={{
              backgroundColor: themeColors.primary,
              borderRadius: 3,
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: "bold",
                color: themeColors.white,
                textAlign: "center",
                textTransform: "uppercase"
              }}
            >
              Done
            </Text>
          </View>
        </RectButton>
        <RectButton style={{ width: "80%", height: 40, marginVertical: 5 }}>
          <View
            style={{
              borderColor: themeColors.primary,
              borderWidth: 1,
              borderRadius: 3,
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: normalize(14),
                fontWeight: "bold",
                color: themeColors.primary,
                textAlign: "center",
                textTransform: "uppercase"
              }}
            >
              Make another payment
            </Text>
          </View>
        </RectButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1
  }
});
