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

type props = {
  payees: IPayee[];
  loading: boolean;
  onPress?: (payee: IPayee) => void;
  navigation: NavigationStackProp;
};
export const FrequentPayees = withNavigation(
  ({ payees, loading, onPress, navigation }: props) => {
    return (
      <View>
        <Text style={styles.sectionHeader}>Frequent</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {payees.map((elem, index) => (
            <BorderlessButton
              key={index}
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                margin: 10,
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
              <LetterAvatar text={elem.name} />
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
