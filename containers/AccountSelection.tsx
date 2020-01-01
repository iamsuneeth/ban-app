import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import { Card } from "../components/elements/card/Card";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { IAccount } from "bank-core/src/types";
import { normalize } from "../utils/normalize";
import { Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "../theme/constants";
import { useTheme, withNavigation } from "react-navigation";
import { Amount } from "../components/elements/amount/Amount";
import { useDashboardState } from "bank-core";
import { colors } from "react-native-elements";

type Props = {
  sheetRef: React.MutableRefObject<BottomSheet>;
  onSelection: (account: IAccount) => void;
  accounts: IAccount[];
};

export const AccountSelection = ({
  sheetRef,
  onSelection,
  accounts
}: Props) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const animationRef = useRef(new Animated.Value(1));
  const accountRef = useRef<IAccount>();
  const opacity = animationRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });
  const themeColors = ThemeColors[useTheme()];
  const selectAccount = (account: IAccount) => {
    //accountRef.current = account;
    sheetRef.current.snapTo(0);
    onSelection(account);
  };
  const onClose = () => {
    setSheetOpen(false);
    //onSelection(accountRef.current);
  };
  return (
    <>
      <BottomSheet
        ref={sheetRef}
        onOpenStart={() => setSheetOpen(true)}
        onCloseStart={onClose}
        snapPoints={[0, "60%"]}
        callbackNode={animationRef.current}
        enabledContentTapInteraction={false}
        renderContent={() => (
          <View style={{ height: "100%" }}>
            <Card
              style={{ height: "100%", marginHorizontal: 0, marginTop: 10 }}
            >
              {accounts.map(account => (
                <Card
                  key={account.id}
                  style={[
                    styles.accountCard,
                    {
                      backgroundColor: themeColors.primary
                    }
                  ]}
                >
                  <RectButton
                    onPress={() => selectAccount(account)}
                    testID="accountClick"
                    style={{ padding: 10 }}
                  >
                    <View style={styles.accountPrimary}>
                      <View style={{ position: "absolute", right: 0 }}>
                        <Ionicons
                          name="ios-arrow-dropright"
                          size={25}
                          color={themeColors.lightGray}
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
            </Card>
          </View>
        )}
      />
      <Animated.View
        pointerEvents={sheetOpen ? "auto" : "none"}
        {...StyleSheet.absoluteFill}
        style={{ backgroundColor: "rgba(0,0,0,0.6)", opacity }}
      ></Animated.View>
    </>
  );
};

export const AccountList = withNavigation(
  ({ onSelection, sheetRef, navigation }) => {
    const { accounts } = useDashboardState();
    const themeColors = ThemeColors[useTheme()];
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", () => {
        sheetRef.current.snapTo(0);
        return navigation.isFocused() ? true : false;
      });
    }, []);
    return (
      <ScrollView>
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
          <Text
            style={{
              fontSize: normalize(25),
              paddingHorizontal: 5,
              marginLeft: 20,
              color: themeColors.gray,
              backgroundColor: "#fff"
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
                  backgroundColor: themeColors.primary
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
                      color={themeColors.lightGray}
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
  }
);

const styles = StyleSheet.create({
  accountCard: {
    padding: 0
  },
  accountPrimary: {
    justifyContent: "space-between"
  },
  main: { color: "#fff", fontSize: normalize(16) },
  secondary: { color: "#fff", fontSize: normalize(12) }
});
