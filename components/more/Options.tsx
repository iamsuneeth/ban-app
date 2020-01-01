import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { ScrollView } from "react-native";
import { Card } from "../elements/card/Card";
import { RectButton } from "react-native-gesture-handler";
import { Ionicons, MaterialCommunityIcons as Icons } from "@expo/vector-icons";
import { normalize } from "../../utils/normalize";
import * as firebase from "firebase";
import { ThemeColors } from "../../theme/constants";
import { useTheme } from "react-navigation";

export const Options = ({ navigation }) => {
  const signOut = async () => {
    await firebase.auth().signOut();
    navigation.navigate("login");
  };
  const themeColors = ThemeColors[useTheme()];
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
                  color={themeColors.primaryDark}
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
          <View style={styles.seperator}></View>
        </Card>
        <View>
          <Button title="Log out" onPress={signOut} />
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
