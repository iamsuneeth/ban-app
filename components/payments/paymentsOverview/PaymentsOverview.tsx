import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "../../elements/card/Card";
import { ScrollView, RectButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons as Icons, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { FavoriteContainer } from "../../../containers/FavoriteContainer";
import { PayeeContainer } from "../../../containers/PayeeContainer";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentParamList } from "../../../stacks/PaymentStack";
import { ThemeType } from "../../../App";

type PaymentsNavigationProps = StackNavigationProp<
  PaymentParamList,
  "PaymentsOverview"
>;

type Props = {
  navigation: PaymentsNavigationProps;
};

export const PaymentsOverview = ({ navigation }: Props) => {
  const { colors } = useTheme() as ThemeType;
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
            shadowOpacity: 0.2,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            shadowColor: colors.shadowColor,
            backgroundColor: colors.surface
          }}
        >
          <RectButton
            onPress={() => navigation.navigate("PayeeSelectionScreen")}
          >
            <View style={[styles.itemContainer]}>
              <View style={styles.icon}>
                <Icons
                  name="bank-transfer-out"
                  size={40}
                  color={colors.primary}
                />
              </View>
              <View style={styles.main}>
                <Text style={[styles.header, { color: colors.text }]}>
                  Transfer money
                </Text>
                <Text
                  numberOfLines={2}
                  style={[styles.description, { color: colors.textSecondary }]}
                >
                  Transfer money to anywhere
                </Text>
              </View>
            </View>
          </RectButton>
          <View
            style={[styles.seperator, { backgroundColor: colors.seperator }]}
          ></View>
          <View>
            <RectButton onPress={() => navigation.navigate("Payees")}>
              <View style={[styles.itemContainer]}>
                <View style={styles.icon}>
                  <Ionicons
                    name="ios-people"
                    size={40}
                    color={colors.primary}
                  />
                </View>
                <View style={styles.main}>
                  <Text style={[styles.header, { color: colors.text }]}>
                    Payees
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.description,
                      { color: colors.textSecondary }
                    ]}
                  >
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
    height: 1,
    width: "90%",
    alignSelf: "center"
  },
  header: {
    fontSize: 16
  },
  description: {
    fontSize: 12
  },
  icon: {
    paddingRight: 10
  }
});
