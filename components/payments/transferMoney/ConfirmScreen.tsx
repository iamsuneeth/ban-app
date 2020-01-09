import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import { usePaymentState } from "bank-core";
import LottieView from "lottie-react-native";
import {
  useTheme,
  CompositeNavigationProp,
  useFocusEffect,
  CommonActions
} from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentParamList } from "../../../stacks/PaymentStack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../../../tabs/BottomTabBar";
import { normalize } from "../../../utils/normalize";
import { Button } from "../../elements/button/Button";

type props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<PaymentParamList, "ConfirmScreen">,
    BottomTabNavigationProp<BottomTabParamList>
  >;
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
  useFocusEffect(
    React.useCallback(() => {
      ref.current.play();
      const handlePress = () => true;
      BackHandler.addEventListener("hardwareBackPress", handlePress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handlePress);
        clearPaymentState();
      };
    }, [])
  );
  const { colors } = useTheme();
  return (
    <View style={styles.animationContainer}>
      <Text
        style={{
          fontSize: normalize(20),
          marginTop: normalize(10, "height"),
          color: colors.text,
          fontWeight: "bold",
          alignSelf: "center"
        }}
      >
        Payment done!!!
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontSize: normalize(14),
            marginRight: normalize(5),
            color: colors.text
          }}
        >
          Ref:
        </Text>
        <Text
          style={{
            fontSize: normalize(14),
            textTransform: "uppercase",
            fontWeight: "bold",
            color: colors.text
          }}
        >
          {state.reference}
        </Text>
      </View>
      <LottieView
        style={{
          alignSelf: "center",
          width: normalize(400)
        }}
        ref={ref}
        loop={false}
        source={require("../../../assets/success.json")}
      />

      <View
        style={{
          flex: 1,
          marginTop: normalize(20, "height"),
          marginHorizontal: normalize(10),
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: normalize(20, "height")
        }}
      >
        <Button
          primary
          style={{
            width: "80%"
          }}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 4,
                routes: [{ name: "PaymentsOverview" }]
              })
            )
          }
        >
          Done
        </Button>
        <Button
          secondary
          style={{
            width: "80%"
          }}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 2,
                routes: [
                  { name: "Accounts" },
                  { name: "PaymentsOverview" },
                  { name: "PayeeSelectionScreen" }
                ]
              })
            )
          }
        >
          Make another payment
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    flex: 1
  }
});
