import React from "react";
import { View, Text, StyleSheet } from "react-native";
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
    <RectButton
      style={{ flex: 1, paddingHorizontal: 10 }}
      onPress={
        onPress
          ? () => onPress(item)
          : () =>
              navigation.navigate("PayeeDetails", {
                payee: item
              })
      }
    >
      <View style={[styles.itemContainer]}>
        <View style={styles.icon}>
          {/* <SharedElement
        id={item.id}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      >
        <LetterAvatar text={item.name} size={50} />
      </SharedElement> */}
          <LetterAvatar text={item.name} size={50} />
        </View>
        <View style={styles.main}>
          {/* <SharedElement
        id={`${item.id}payeeName`}
        style={{ alignSelf: "flex-start" }}
      >
        <Text style={styles.header}>{item.name}</Text>
      </SharedElement> */}
          <Text style={[styles.header, { color: colors.text }]}>
            {item.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            {/* <SharedElement
          id={`${item.id}code`}
          style={{ marginRight: 10 }}
        >
          <Text style={styles.description}>{item.code}</Text>
        </SharedElement> */}
            <Text style={styles.description}>{item.code}</Text>
            {/* <SharedElement id={`${item.id}accountNumber`}>
          <Text style={styles.description}>
            {item.accountNumber}
          </Text>
        </SharedElement> */}
            <Text style={styles.description}>{item.accountNumber}</Text>
          </View>
        </View>
      </View>
    </RectButton>
  );
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Text style={[styles.sectionHeader, { color: colors.sectionHeader }]}>
          All payees
        </Text>
        <RectButton
          onPress={() => navigation.navigate("AddPayee")}
          style={[styles.actionButton]}
        >
          <Ionicons name="md-person-add" color={colors.primary} size={25} />
          <Text style={[styles.actionButtontext, { color: colors.primary }]}>
            Add payee
          </Text>
        </RectButton>
      </View>
      {useFlatList && (
        <AnimatedList
          data={payees}
          listItemHeight={80}
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
              flex: 1,
              paddingVertical: 10
            }}
          >
            {renderItem(item, index)}
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 60,
    paddingHorizontal: 10
  },
  sectionHeader: {
    fontSize: normalize(14),
    margin: 15,
    fontWeight: "bold"
  },
  main: {
    justifyContent: "center",
    flex: 1
  },
  seperator: {
    height: 1,
    width: "90%",
    alignSelf: "center"
  },
  header: {
    fontSize: normalize(16)
  },
  description: {
    fontSize: normalize(12)
  },
  icon: {
    paddingRight: 10
  },
  actionButton: {
    paddingVertical: 5,
    margin: 5,
    paddingHorizontal: 10,
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3
  },
  actionButtontext: {
    textAlign: "center",
    marginLeft: 5,
    fontSize: normalize(14)
  }
});
