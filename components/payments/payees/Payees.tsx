import React from "react";
import { View, StyleSheet } from "react-native";
import { IPayeeFilter, IPayee } from "bank-core/src/types";
import { RectButton } from "react-native-gesture-handler";
import { LetterAvatar } from "../../common/LetterAvatar";
import { AnimatedList } from "react-native-reanimated-list";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaymentParamList } from "../../../stacks/PaymentStack";
import { ThemeType } from "../../../App";
import { normalize } from "../../../utils/normalize";
import { List } from "react-native-paper";
import { Row } from "../../elements/view/Row";
import { Text } from "../../elements/text/Text";
import { Button } from "../../elements/button/Button";

type props = {
  payees: IPayee[];
  loading: boolean;
  useFlatList: boolean;
  filterPayees: (filter: IPayeeFilter) => void;
  onPress?: (payee: IPayee) => void;
};

type PayeeNavigationProps = StackNavigationProp<PaymentParamList, "Payees">;

export const Payees = ({ payees, loading, useFlatList, onPress }: props) => {
  const { colors } = useTheme() as ThemeType;
  const navigation = useNavigation<PayeeNavigationProps>();
  const renderItem = (item, index) => (
    <List.Item
      onPress={
        onPress
          ? () => onPress(item)
          : () =>
              navigation.navigate("PayeeDetails", {
                payee: item
              })
      }
      title={item.name}
      description={`${item.code} - ${item.accountNumber}`}
      left={({ style }) => (
        <View style={styles.icon}>
          <LetterAvatar text={item.name} size={50} />
        </View>
      )}
    />
  );
  return (
    <View style={{ flex: 1 }}>
      <Row padding size="medium">
        <Text type="section">All payees</Text>
        <RectButton
          onPress={() => navigation.navigate("AddPayee")}
          style={[styles.actionButton]}
        >
          <Ionicons name="md-person-add" color={colors.primary} size={25} />
          <Text style={[styles.actionButtontext, { color: colors.primary }]}>
            Add payee
          </Text>
        </RectButton>
      </Row>
      {useFlatList && (
        <AnimatedList
          data={payees}
          listItemHeight={normalize(60, "height")}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => (
            <View
              key={item.id}
              style={{
                flex: 1
              }}
            >
              {renderItem(item, index)}
            </View>
          )}
        />
      )}
      {!useFlatList &&
        payees.map((item, index) => (
          <View
            key={item.id}
            style={{
              flex: 1
            }}
          >
            {renderItem(item, index)}
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingRight: normalize(10),
    alignItems: "center"
  },
  actionButton: {
    height: normalize(40, "height"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  actionButtontext: {
    textAlign: "center",
    marginLeft: normalize(5)
  }
});
