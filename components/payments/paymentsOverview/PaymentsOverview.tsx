import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons as Icons, Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { FavoriteContainer } from "../../../containers/FavoriteContainer";
import { PayeeContainer } from "../../../containers/PayeeContainer";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentParamList } from "../../../stacks/PaymentStack";
import { ThemeType } from "../../../App";
import { ListContainer } from "../../elements/list/ListContainer";
import { List } from "react-native-paper";
import { Seperator } from "../../elements/view/Seperator";

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
        <ListContainer>
          <List.Item
            title="Transfer money"
            onPress={() => navigation.navigate("PayeeSelectionScreen")}
            description="Transfer money to anywhere"
            left={() => (
              <Icons
                name="bank-transfer-out"
                size={40}
                color={colors.primary}
              />
            )}
          />
          <Seperator />
          <List.Item
            title="Payees"
            onPress={() => navigation.navigate("Payees")}
            description="View and manage payees"
            left={() => (
              <Ionicons name="ios-people" size={40} color={colors.primary} />
            )}
          />
        </ListContainer>
        <PayeeContainer type="recent" />
        <FavoriteContainer />
      </ScrollView>
    </View>
  );
};
