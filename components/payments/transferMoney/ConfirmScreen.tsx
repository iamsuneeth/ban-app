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
          fontSize: 20,
          marginTop: 10,
          color: colors.text,
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
            fontSize: 14,
            marginRight: 5,
            color: colors.text
          }}
        >
          Ref:
        </Text>
        <Text
          style={{
            fontSize: 14,
            textTransform: "uppercase",
            fontWeight: "bold",
            color: colors.text
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
        <RectButton
          style={{ width: "80%", height: 40, marginVertical: 5 }}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 4,
                routes: [{ name: "PaymentsOverview" }]
              })
            )
          }
        >
          <View
            style={{
              backgroundColor: colors.primary,
              borderRadius: 3,
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase"
              }}
            >
              Done
            </Text>
          </View>
        </RectButton>
        <RectButton
          style={{ width: "80%", height: 40, marginVertical: 5 }}
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
          <View
            style={{
              borderColor: colors.primary,
              borderWidth: 1,
              borderRadius: 3,
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: colors.primary,
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
