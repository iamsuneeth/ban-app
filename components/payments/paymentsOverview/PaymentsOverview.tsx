import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../../elements/card/Card";
import { ScrollView, RectButton } from "react-native-gesture-handler";
import { normalize } from "../../../utils/normalize";
import { MaterialCommunityIcons as Icons, Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "../../../theme/constants";
import { useTheme } from "react-navigation";
import { FavoriteContainer } from "../../../containers/FavoriteContainer";
import { PayeeContainer } from "../../../containers/PayeeContainer";
import { NavigationStackProp } from "react-navigation-stack";
import { IFavoriteState } from "bank-core/src/types";

type Props = {
  navigation: NavigationStackProp;
};

export const PaymentsOverview = ({ navigation }: Props) => {
  const themeColors = ThemeColors[useTheme()];
  return (
    <View
      style={{
        flex: 1
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card
          style={{
            marginTop: 0,
            marginHorizontal: 0,
            shadowOpacity: 0.2
          }}
        >
          <RectButton onPress={() => navigation.navigate("makePayment")}>
            <View style={[styles.itemContainer]}>
              <View style={styles.icon}>
                <Icons
                  name="bank-transfer-out"
                  size={40}
                  color={themeColors.primaryDark}
                />
              </View>
              <View style={styles.main}>
                <Text style={styles.header}>Transfer money</Text>
                <Text numberOfLines={2} style={styles.description}>
                  Transfer money to anywhere
                </Text>
              </View>
            </View>
          </RectButton>
          <View style={styles.seperator}></View>
          <View>
            <RectButton onPress={() => navigation.navigate("payees")}>
              <View style={[styles.itemContainer]}>
                <View style={styles.icon}>
                  <Ionicons
                    name="ios-people"
                    size={40}
                    color={themeColors.primaryDark}
                  />
                </View>
                <View style={styles.main}>
                  <Text style={styles.header}>Payees</Text>
                  <Text numberOfLines={2} style={styles.description}>
                    View and manage payees
                  </Text>
                </View>
              </View>
            </RectButton>
          </View>
        </Card>
        <PayeeContainer type="recent" />
        <FavoriteContainer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
    paddingHorizontal: 10
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
  },
  sectionHeader: {
    fontSize: normalize(20),
    margin: 15,
    fontWeight: "bold",
    color: "#555"
  }
});
