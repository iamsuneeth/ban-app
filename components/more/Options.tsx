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
import { Spacer } from "../elements/utils/Spacer";
import { List } from "react-native-paper";
import { ListContainer } from "../elements/list/ListContainer";

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
      <ListContainer>
        <List.Item
          title="Manage biometry"
          onPress={() => navigation.navigate("Biometry")}
          description="Configure biometric authentication"
          left={() => (
            <Icons name="bank-transfer-out" size={40} color={colors.primary} />
          )}
        />
      </ListContainer>
      <View style={{ alignItems: "center" }}>
        <Button onPress={signOut} style={{ width: "80%" }} primary>
          Sign out
        </Button>
        <Spacer type="xLarge" />
        <Spacer type="xLarge" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
