import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import { Card } from "../components/elements/card/Card";
import BottomSheet from "reanimated-bottom-sheet";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { IAccount } from "bank-core/src/types";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Amount } from "../components/elements/amount/Amount";
import { useDashboardState } from "bank-core";
import { ThemeType } from "../App";

type Props = {
  sheetRef: React.MutableRefObject<BottomSheet>;
  onSelection: (account: IAccount) => void;
};

export const AccountSelection = ({ onSelection, sheetRef }: Props) => {
  const { accounts } = useDashboardState();
  const navigation = useNavigation();
  const { colors } = useTheme() as ThemeType;
  const handlePress = () => {
    sheetRef.current.snapTo(0);
    return navigation.isFocused() ? true : false;
  };
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handlePress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handlePress);
    };
  }, []);
  return (
    <ScrollView>
      <View
        style={{
          height: 5,
          marginHorizontal: 10,
          borderRadius: 3,
          top: 35,
          backgroundColor: colors.primary
        }}
      />
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: "row",
          paddingVertical: 10
        }}
      >
        <Text
          style={{
            fontSize: 25,
            paddingHorizontal: 5,
            marginLeft: 20,
            color: colors.text,
            backgroundColor: colors.surface
          }}
        >
          Select account
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        {accounts.map(account => (
          <Card
            key={account.id}
            style={[
              styles.accountCard,
              {
                backgroundColor: colors.primaryDark,
                shadowColor: colors.shadowColor
              }
            ]}
          >
            <RectButton
              onPress={() => {
                sheetRef.current.snapTo(0);
                onSelection(account);
              }}
              testID="accountClick"
              style={{ padding: 10 }}
            >
              <View style={styles.accountPrimary}>
                <View style={{ position: "absolute", right: 0 }}>
                  <Ionicons
                    name="ios-arrow-dropright"
                    size={25}
                    color={colors.text}
                  />
                </View>

                <View>
                  <Text style={styles.main}>{account.nickName}</Text>
                  <Text style={styles.secondary}>
                    {account.code + " " + account.accountNumber}
                  </Text>
                  <Text style={styles.secondary}>{account.type}</Text>
                </View>
                <View style={{ alignSelf: "flex-end" }}>
                  <Amount
                    amount={account.balance.amount}
                    currency={account.balance.currency}
                    style={{ content: { color: "#fff" } }}
                    size={25}
                  />
                </View>
              </View>
            </RectButton>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  accountCard: {
    padding: 0
  },
  accountPrimary: {
    justifyContent: "space-between"
  },
  main: { color: "#fff", fontSize: 16 },
  secondary: { color: "#fff", fontSize: 12 }
});
