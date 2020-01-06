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
import { IPayee } from "bank-core/typescript/types";
import { useNavigation } from "@react-navigation/native/";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentParamList } from "../../../stacks/PaymentStack";

type PayeeNavigationProps = StackNavigationProp<PaymentParamList, "Payees">;

type props = {
  payees: IPayee[];
  loading: boolean;
  onPress?: (payee: IPayee) => void;
};
export const FrequentPayees = ({ payees, loading, onPress }: props) => {
  const navigation = useNavigation<PayeeNavigationProps>();
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
                    navigation.navigate("PayeeDetails", {
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
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 14,
    margin: 15,
    fontWeight: "bold",
    color: "#555"
  }
});
