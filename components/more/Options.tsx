import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Card } from "../elements/card/Card";
import { RectButton } from "react-native-gesture-handler";
import { MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import { normalize } from "../../utils/normalize";
import * as firebase from "firebase";

import { useTheme } from "@react-navigation/native";

export const Options = ({ navigation }) => {
  const signOut = async () => {
    await firebase.auth().signOut();
    navigation.navigate("login");
  };
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <ScrollView>
        <Card
          style={{
            marginTop: 0,
            marginHorizontal: 0,
            shadowOpacity: 0.2
          }}
        >
          <RectButton onPress={() => navigation.navigate("manageBiometry")}>
            <View style={[styles.itemContainer]}>
              <View style={styles.icon}>
                <Icons
                  name="bank-transfer-out"
                  size={40}
                  color={colors.primary}
                />
              </View>
              <View style={styles.main}>
                <Text style={styles.header}>Manage biometry</Text>
                <Text numberOfLines={2} style={styles.description}>
                  Configure biometric authentication
                </Text>
              </View>
            </View>
          </RectButton>
        </Card>
        <View style={{ alignItems: "center" }}>
          <RectButton style={{ height: 40, width: 200 }} onPress={signOut}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5
              }}
            >
              <Text style={{ fontSize: 14, color: "#fff" }}>Sign out</Text>
            </View>
          </RectButton>
        </View>
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
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
