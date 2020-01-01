import React from "react";
import { View, Text } from "react-native";
import { MakePaymentHeader } from "./MakePaymentHeader";
import { PayeeContainer } from "../../../containers/PayeeContainer";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationStackProp } from "react-navigation-stack";
import { IPaymentDetails, IPayee } from "bank-core/src/types";
import { normalize } from "../../../utils/normalize";
import { ThemeColors } from "../../../theme/constants";
import { useTheme } from "react-navigation";
import { SharedElement } from "react-navigation-shared-element";

type Props = {
  navigation: NavigationStackProp;
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
    navigation.navigate("amountScreen", {
      payeeId: payee.id
    });
  };
  const themeColors = ThemeColors[useTheme()];
  return (
    <View style={{ flex: 1 }}>
      <ScrollView scrollEventThrottle={1}>
        <View
          style={{
            height: 5,
            marginHorizontal: 10,
            borderRadius: 3,
            top: 35,
            backgroundColor: themeColors.primaryDark
          }}
        />
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            paddingVertical: 10
          }}
        >
          <SharedElement id="title">
            <Text
              style={{
                fontSize: normalize(25),
                paddingHorizontal: 5,
                marginLeft: 20,
                color: themeColors.gray,
                backgroundColor: "#fff"
              }}
            >
              Select payee
            </Text>
          </SharedElement>
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
