import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  Alert
} from "react-native";
import { RectButton, BorderlessButton } from "react-native-gesture-handler";
import { LetterAvatar } from "../../common/LetterAvatar";
import { IFavoriteState } from "bank-core/src/types";
import { Amount } from "../../elements/amount/Amount";
import {
  useTheme,
  useNavigation,
  CompositeNavigationProp
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentParamList } from "../../../stacks/PaymentStack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../../../tabs/BottomTabBar";
import { ThemeType } from "../../../App";
import { normalize } from "../../../utils/normalize";

type Props = {
  favorites: IFavoriteState;
  style?: ViewStyle;
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

type FavoriteNavigationProps = CompositeNavigationProp<
  StackNavigationProp<PaymentParamList, "PaymentsOverview">,
  BottomTabNavigationProp<BottomTabParamList>
>;

export const Favorites = ({ favorites, style }: Props) => {
  const { loading, favorites: favoritePayments, error } = favorites;
  const { colors } = useTheme() as ThemeType;
  const navigation = useNavigation<FavoriteNavigationProps>();
  return (
    <>
      <View style={[{ marginVertical: normalize(10, "height") }, style]}>
        <Text style={[styles.sectionHeader, { color: colors.sectionHeader }]}>
          Favorites
        </Text>
        <View>
          {favoritePayments.map((favorite, index) => (
            <View key={favorite.id}>
              <View style={{ flexDirection: "row" }}>
                <RectButton style={{ flex: 1, paddingVertical: 10 }}>
                  <View style={[styles.itemContainer]}>
                    <View style={styles.icon}>
                      <LetterAvatar text={favorite.payeeName} size={50} />
                    </View>
                    <View style={styles.main}>
                      <Text style={[styles.header, { color: colors.text }]}>
                        {favorite.payeeName}
                      </Text>
                      <Text
                        style={[
                          styles.description,
                          { color: colors.sectionHeader }
                        ]}
                      >
                        Account Number: {favorite.accountNumber}
                      </Text>
                      <Amount
                        amount={favorite.amount.amount}
                        style={{
                          content: {
                            color: colors.text
                          }
                        }}
                        currency={favorite.amount.currency}
                      />
                      <Text
                        style={[
                          styles.description,
                          { color: colors.sectionHeader }
                        ]}
                      >
                        {favorite.paymentType}
                      </Text>
                    </View>
                    <BorderlessButton
                      style={{
                        justifyContent: "flex-end",
                        paddingRight: normalize(10)
                      }}
                      onPress={() =>
                        navigation.navigate("Modal", {
                          message: `Do you want to delete this favorite ?`
                        })
                      }
                    >
                      <Text
                        style={{
                          color: colors.primary,
                          fontSize: normalize(14)
                        }}
                      >
                        Delete
                      </Text>
                    </BorderlessButton>
                  </View>
                </RectButton>
              </View>
              {index !== favoritePayments.length - 1 && (
                <View
                  style={[
                    styles.seperator,
                    { backgroundColor: colors.seperator }
                  ]}
                />
              )}
            </View>
          ))}
          <ActivityIndicator animating={favorites.loading} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: normalize(60, "height"),
    paddingHorizontal: normalize(10)
  },
  sectionHeader: {
    fontSize: normalize(14),
    margin: normalize(15),
    fontWeight: "bold"
  },
  main: {
    justifyContent: "center",
    flex: 1
  },
  seperator: {
    height: 1,
    width: "90%",
    alignSelf: "center"
  },
  header: {
    fontSize: normalize(16)
  },
  description: {
    fontSize: normalize(12)
  },
  icon: {
    paddingRight: normalize(10)
  }
});
