import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { normalize } from "../../../utils/normalize";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";
import { LetterAvatar } from "../../common/LetterAvatar";
import { IFavoriteState } from "bank-core/src/types";
import { useTheme, withNavigation } from "react-navigation";
import { ThemeColors } from "../../../theme/constants";
import { Amount } from "../../elements/amount/Amount";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import { Card } from "../../elements/card/Card";
import { NavigationStackProp } from "react-navigation-stack";

type Props = {
  favorites: IFavoriteState;
  style?: ViewStyle;
  navigation: NavigationStackProp;
};

const colorList = [
  {
    text: "#e6194B",
    background: "#fabebe"
  },
  {
    text: "#f58231",
    background: "#ffd8b1"
  },
  {
    text: "#ffe119",
    background: "#fffac8"
  },
  {
    text: "#3cb44b",
    background: "#aaffc3"
  },
  {
    text: "#911eb4",
    background: "#e6beff"
  }
];

export const Favorites = withNavigation(
  ({ favorites, style, navigation }: Props) => {
    const { loading, favorites: favoritePayments, error } = favorites;
    const themeColors = ThemeColors[useTheme()];
    return (
      <>
        <View style={[{ marginVertical: 10 }, style]}>
          <Text style={styles.sectionHeader}>Favorites</Text>
          <View>
            {favoritePayments.map((favorite, index) => (
              <View key={favorite.id}>
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                  <RectButton style={{ flex: 1 }}>
                    <View style={[styles.itemContainer]}>
                      <View style={styles.icon}>
                        <LetterAvatar
                          text={favorite.payeeName}
                          size={50}
                          viewStyle={{
                            backgroundColor: colorList[index % 5].background
                          }}
                          textStyle={{
                            color: colorList[index % 5].text
                          }}
                        />
                      </View>
                      <View style={styles.main}>
                        <Text style={styles.header}>{favorite.payeeName}</Text>
                        <Text style={styles.description}>
                          Account Number: {favorite.accountNumber}
                        </Text>
                        <Amount
                          amount={favorite.amount.amount}
                          currency={favorite.amount.currency}
                        />
                        <Text style={styles.description}>
                          {favorite.paymentType}
                        </Text>
                      </View>
                    </View>
                  </RectButton>
                  <BorderlessButton
                    style={{ justifyContent: "flex-end", paddingRight: 10 }}
                    onPress={() => navigation.navigate("modal")}
                  >
                    <Text
                      style={{
                        color: themeColors.primaryDark,
                        fontSize: normalize(14)
                      }}
                    >
                      Delete
                    </Text>
                  </BorderlessButton>
                </View>
                {index !== new Array(10).length - 1 && (
                  <View style={styles.seperator} />
                )}
              </View>
            ))}
          </View>
        </View>
      </>
    );
  }
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
    paddingHorizontal: 10
  },
  sectionHeader: {
    fontSize: normalize(20),
    margin: 15,
    fontWeight: "bold",
    color: "#555"
  },
  main: {
    justifyContent: "center",
    flex: 1
  },
  seperator: {
    backgroundColor: "#eee",
    height: 1,
    width: "90%",
    alignSelf: "center"
  },
  header: {
    fontSize: normalize(16)
  },
  description: {
    fontSize: normalize(12),
    color: "#888"
  },
  icon: {
    paddingRight: 10
  }
});
