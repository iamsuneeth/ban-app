import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { LetterAvatar } from "../../common/LetterAvatar";
import { normalize } from "../../../utils/normalize";
import { IPayee } from "bank-core/typescript/types";
import { NavigationStackProp } from "react-navigation-stack";
import { withNavigation } from "react-navigation";
import { SharedElement } from "react-navigation-shared-element";

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

type props = {
  payees: IPayee[];
  loading: boolean;
  onPress?: (payee: IPayee) => void;
  navigation: NavigationStackProp;
};
export const RecentPayees = withNavigation(
  ({ payees, loading, onPress, navigation }: props) => {
    return (
      <View>
        <Text style={styles.sectionHeader}>Recent</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {payees.map((elem, index) => (
            <BorderlessButton
              key={index}
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                margin: 5,
                width: 80
              }}
              onPress={
                onPress
                  ? () => onPress(elem)
                  : () =>
                      navigation.navigate("payeeDetails", {
                        payee: elem
                      })
              }
            >
              <SharedElement id={elem.id}>
                <LetterAvatar text={elem.name} />
              </SharedElement>
              <Text numberOfLines={1} style={{ color: "#333" }}>
                {elem.name.split(" ")[0]}
              </Text>
            </BorderlessButton>
          ))}
        </ScrollView>
        <ActivityIndicator animating={loading} />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: normalize(14),
    margin: 15,
    fontWeight: "bold",
    color: "#555"
  }
});
