import React, { useState } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BorderlessButton, TextInput } from "react-native-gesture-handler";
import { IPayeeFilter, IPaymentState, IAccount } from "bank-core/src/types";
import { LetterAvatar } from "../../common/LetterAvatar";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentParamList } from "../../../stacks/PaymentStack";
import { RouteProp, useTheme } from "@react-navigation/native";
import { normalize } from "../../../utils/normalize";

type Props = {
  filterPayees: (filter: IPayeeFilter) => void;
  filters: { searchString: string };
  navigation: StackNavigationProp<
    PaymentParamList,
    "PayeeSelectionScreen" | "AmountScreen"
  >;
  route: RouteProp<PaymentParamList, "PayeeSelectionScreen" | "AmountScreen">;
  paymentState: IPaymentState;
  clearPaymentState: () => void;
  onAccountSelection: (account: IAccount) => void;
};

export const MakePaymentHeader = ({
  navigation,
  filterPayees,
  filters,
  paymentState,
  route
}: Props) => {
  const [visible, setVisible] = useState(false);
  const handleSearch = text => {
    filterPayees({
      searchString: text
    });
  };
  const goBack = () => {
    navigation.pop();
  };

  const payeeVisible = route.name !== "PayeeSelectionScreen";
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.background,
        paddingTop: getStatusBarHeight() + 20
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginBottom: 5,
          alignItems: "flex-start"
        }}
      >
        <View
          style={{
            paddingLeft: 10,
            flex: 1,
            alignItems: "flex-start"
          }}
        >
          <BorderlessButton onPress={goBack}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons color={colors.text} name="ios-arrow-back" size={30} />
              <Text
                style={{
                  color: colors.text,
                  fontSize: normalize(16),
                  marginLeft: 5,
                  fontWeight: "700"
                }}
              >
                Send money
              </Text>
            </View>
          </BorderlessButton>
        </View>
        {!payeeVisible && (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
          >
            {visible && (
              <TextInput
                placeholder={"Search..."}
                placeholderTextColor={colors.text}
                clearButtonMode={"always"}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handleSearch}
                autoFocus
                value={filters.searchString}
                onBlur={() => setVisible(false)}
                style={{
                  padding: 5,
                  flex: 1,
                  color: colors.text,
                  height: "100%",
                  alignSelf: "stretch"
                }}
              />
            )}
            {!visible && (
              <BorderlessButton
                onPress={() => setVisible(true)}
                style={{ marginRight: 10 }}
              >
                <Ionicons color={colors.text} name="ios-search" size={30} />
              </BorderlessButton>
            )}
          </View>
        )}
        {payeeVisible && paymentState.details.payee && (
          <View style={{ alignItems: "flex-end", marginRight: 10 }}>
            {/* <SharedElement id={paymentState.details.payee.id}>
              <LetterAvatar
                text={paymentState.details.payee.name}
                size={40}
                viewStyle={{ marginBottom: 0 }}
              />
            </SharedElement> */}
            <LetterAvatar
              text={paymentState.details.payee.name}
              size={40}
              viewStyle={{ marginBottom: 0 }}
            />
            <Text
              style={{
                color: colors.text,
                fontSize: normalize(14)
              }}
            >
              {paymentState.details.payee.name}
            </Text>
            <Text
              style={{
                color: colors.text,
                fontSize: normalize(12)
              }}
            >
              {`${paymentState.details.payee.code} - ${paymentState.details.payee.accountNumber}`}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
