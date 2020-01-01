import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  BorderlessButton,
  TextInput,
  RectButton
} from "react-native-gesture-handler";
import { NavigationStackProp } from "react-navigation-stack";
import { normalize } from "../../../utils/normalize";
import { IPayeeFilter, IPaymentState, IAccount } from "bank-core/src/types";
import { LetterAvatar } from "../../common/LetterAvatar";
import { Amount } from "../../elements/amount/Amount";
import { ThemeColors } from "../../../theme/constants";
import { useTheme, ThemeColors as RNThemeColors } from "react-navigation";
import { SharedElement } from "react-navigation-shared-element";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

type Props = {
  filterPayees: (filter: IPayeeFilter) => void;
  filters: { searchString: string };
  navigation: NavigationStackProp;
  paymentState: IPaymentState;
  clearPaymentState: () => void;
  onAccountSelection: (account: IAccount) => void;
};

export const MakePaymentHeader = ({
  navigation,
  filterPayees,
  filters,
  paymentState,
  clearPaymentState,
  onAccountSelection
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

  const payeeVisible = navigation.state.routeName !== "payeeSelectionScreen";
  const themeColors = ThemeColors[useTheme()];
  return (
    <View
      style={{
        backgroundColor: RNThemeColors[useTheme()].header,
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
              <Ionicons
                color={RNThemeColors[useTheme()].label}
                name="ios-arrow-back"
                size={30}
              />
              <Text
                style={{
                  color: RNThemeColors[useTheme()].label,
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
                placeholderTextColor={RNThemeColors[useTheme()].label}
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
                  color: RNThemeColors[useTheme()].label,
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
                <Ionicons color="white" name="ios-search" size={30} />
              </BorderlessButton>
            )}
          </View>
        )}
        {payeeVisible && paymentState.details.payee && (
          <View style={{ alignItems: "flex-end", marginRight: 10 }}>
            <SharedElement id={paymentState.details.payee.id}>
              <LetterAvatar
                text={paymentState.details.payee.name}
                size={40}
                viewStyle={{ marginBottom: 0 }}
              />
            </SharedElement>
            <Text
              style={{
                color: RNThemeColors[useTheme()].label,
                fontSize: normalize(14)
              }}
            >
              {paymentState.details.payee.name}
            </Text>
            <Text
              style={{
                color: RNThemeColors[useTheme()].label,
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
