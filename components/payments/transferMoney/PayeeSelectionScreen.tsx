import React from "react";
import { View, Text } from "react-native";
import { PayeeContainer } from "../../../containers/PayeeContainer";
import { ScrollView } from "react-native-gesture-handler";
import { IPaymentDetails, IPayee } from "bank-core/src/types";
import { useTheme, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentParamList } from "../../../stacks/PaymentStack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../../../tabs/BottomTabBar";
import { normalize } from "../../../utils/normalize";

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<PaymentParamList, "PayeeSelectionScreen">,
    BottomTabNavigationProp<BottomTabParamList>
  >;
  updatePaymentState: (details: IPaymentDetails) => void;
};

export const PayeeSelectionScreen = ({
  updatePaymentState,
  navigation
}: Props) => {
  const onPressCallBack = (payee: IPayee) => {
    updatePaymentState({
      payee
    });
    navigation.navigate("AmountScreen", {
      payee
    });
  };
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView scrollEventThrottle={1}>
        <View
          style={{
            height: normalize(5),
            marginHorizontal: normalize(10),
            borderRadius: 3,
            top: normalize(35),
            backgroundColor: colors.primary
          }}
        />
        <View
          style={{
            marginHorizontal: normalize(10),
            flexDirection: "row",
            paddingVertical: normalize(10)
          }}
        >
          <Text
            style={{
              fontSize: normalize(25),
              paddingHorizontal: normalize(5),
              marginLeft: normalize(20),
              color: colors.text,
              backgroundColor: colors.background
            }}
          >
            Select payee
          </Text>
        </View>
        <PayeeContainer
          type="recent"
          complyFilter={true}
          onPress={onPressCallBack}
        />
        <PayeeContainer
          type="all"
          useFlatList={false}
          complyFilter={true}
          onPress={onPressCallBack}
        />
      </ScrollView>
    </View>
  );
};
