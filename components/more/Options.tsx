import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Card } from "../elements/card/Card";
import { RectButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { MoreParamList } from "../../stacks/MoreStack";
import { useTheme, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../../tabs/BottomTabBar";
import { useAuthState } from "bank-core";
import { ThemeType } from "../../App";
import { normalize } from "../../utils/normalize";
import { Button } from "../elements/button/Button";

type OptionsProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<MoreParamList>,
    BottomTabNavigationProp<BottomTabParamList>
  >;
};

export const Options = ({ navigation }: OptionsProps) => {
  const { signOutSuccess } = useAuthState();
  const signOut = async () => {
    await SecureStore.deleteItemAsync("biometryEnabled");
    await firebase.auth().signOut();
    signOutSuccess();
  };
  const { colors } = useTheme() as ThemeType;
  return (
    <View style={styles.container}>
      <Card
        style={{
          marginTop: normalize(0, "height"),
          marginHorizontal: normalize(0),
          shadowOpacity: 0.2,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          shadowColor: colors.shadowColor,
          backgroundColor: colors.surface
        }}
      >
        <RectButton onPress={() => navigation.navigate("Biometry")}>
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
                Manage biometry
              </Text>
              <Text numberOfLines={2} style={styles.description}>
                Configure biometric authentication
              </Text>
            </View>
          </View>
        </RectButton>
      </Card>
      <View
        style={{ alignItems: "center", marginBottom: normalize(40, "height") }}
      >
        <Button onPress={signOut} style={{ width: "80%" }} primary>
          Sign out
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
    paddingHorizontal: normalize(10)
  },
  main: {
    justifyContent: "center",
    flex: 1
  },
  seperator: {
    backgroundColor: "#eee",
    height: normalize(1, "height"),
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
    paddingRight: normalize(10)
  },
  container: {
    flex: 1,
    justifyContent: "space-between"
  }
});
