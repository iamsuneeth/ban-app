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
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../../../App";
import { normalize } from "../../../utils/normalize";

type PayeeNavigationProps = StackNavigationProp<PaymentParamList, "Payees">;

type props = {
  payees: IPayee[];
  loading: boolean;
  onPress?: (payee: IPayee) => void;
};
export const RecentPayees = ({ payees, loading, onPress }: props) => {
  const navigation = useNavigation<PayeeNavigationProps>();
  const { colors } = useTheme() as ThemeType;
  return (
    <View>
      <Text style={[styles.sectionHeader, { color: colors.sectionHeader }]}>
        Recent
      </Text>
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
                    navigation.navigate("PayeeDetails", {
                      payee: elem
                    })
            }
          >
            {/* <SharedElement id={elem.id}>
              <LetterAvatar text={elem.name} />
            </SharedElement> */}
            <LetterAvatar text={elem.name} />
            <Text numberOfLines={1} style={{ color: colors.text }}>
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
    fontWeight: "bold"
  }
});
