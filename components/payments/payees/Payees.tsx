import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { IPayeeFilter, IPayee } from "bank-core/src/types";
import { RectButton } from "react-native-gesture-handler";
import { normalize } from "../../../utils/normalize";
import { LetterAvatar } from "../../common/LetterAvatar";
import { AnimatedList } from "react-native-reanimated-list";
import { NavigationStackProp } from "react-navigation-stack";
import { withNavigation, useTheme } from "react-navigation";
import { SharedElement } from "react-navigation-shared-element";
import { ThemeColors } from "../../../theme/constants";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../elements/card/Card";
type props = {
  payees: IPayee[];
  loading: boolean;
  useFlatList: boolean;
  navigation: NavigationStackProp;
  filterPayees: (filter: IPayeeFilter) => void;
  onPress?: (payee: IPayee) => void;
};

export const Payees = withNavigation(
  ({ payees, loading, navigation, useFlatList, onPress }: props) => {
    const themeColors = ThemeColors[useTheme()];
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={styles.sectionHeader}>All payees</Text>
          <RectButton
            onPress={() => navigation.navigate("addPayee")}
            style={[styles.actionButton]}
          >
            <Ionicons
              name="md-person-add"
              color={themeColors.primaryDark}
              size={25}
            />
            <Text
              style={[
                styles.actionButtontext,
                { color: themeColors.primaryDark }
              ]}
            >
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
                <RectButton
                  style={{ flex: 1, paddingHorizontal: 10 }}
                  onPress={
                    onPress
                      ? () => onPress(item)
                      : () =>
                          navigation.navigate("payeeDetails", {
                            payee: item
                          })
                  }
                >
                  <View style={[styles.itemContainer]}>
                    <View style={styles.icon}>
                      <SharedElement
                        id={item.id}
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                      >
                        <LetterAvatar text={item.name} size={50} />
                      </SharedElement>
                    </View>
                    <View style={styles.main}>
                      <SharedElement
                        id={`${item.id}payeeName`}
                        style={{ alignSelf: "flex-start" }}
                      >
                        <Text style={styles.header}>{item.name}</Text>
                      </SharedElement>
                      <View style={{ flexDirection: "row" }}>
                        <SharedElement
                          id={`${item.id}code`}
                          style={{ marginRight: 10 }}
                        >
                          <Text style={styles.description}>{item.code}</Text>
                        </SharedElement>
                        <SharedElement id={`${item.id}accountNumber`}>
                          <Text style={styles.description}>
                            {item.accountNumber}
                          </Text>
                        </SharedElement>
                      </View>
                    </View>
                  </View>
                </RectButton>
              </View>
            )}
          />
        )}
        {!useFlatList &&
          payees.map(item => (
            <View
              key={item.id}
              style={{
                flex: 1,
                marginVertical: 10
              }}
            >
              <RectButton
                style={{ flex: 1, paddingHorizontal: 10 }}
                onPress={
                  onPress
                    ? () => onPress(item)
                    : () =>
                        navigation.navigate("payeeDetails", {
                          payee: item
                        })
                }
              >
                <View style={[styles.itemContainer]}>
                  <View style={styles.icon}>
                    <SharedElement
                      id={item.id}
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                    >
                      <LetterAvatar text={item.name} size={50} />
                    </SharedElement>
                  </View>
                  <View style={styles.main}>
                    <SharedElement
                      id={`${item.id}payeeName`}
                      style={{ alignSelf: "flex-start" }}
                    >
                      <Text style={styles.header}>{item.name}</Text>
                    </SharedElement>
                    <View style={{ flexDirection: "row" }}>
                      <SharedElement
                        id={`${item.id}code`}
                        style={{ marginRight: 10 }}
                      >
                        <Text style={styles.description}>{item.code}</Text>
                      </SharedElement>
                      <SharedElement id={`${item.id}accountNumber`}>
                        <Text style={styles.description}>
                          {item.accountNumber}
                        </Text>
                      </SharedElement>
                    </View>
                  </View>
                </View>
              </RectButton>
            </View>
          ))}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 60,
    paddingHorizontal: 10
  },
  sectionHeader: {
    fontSize: normalize(20),
    margin: 15,
    fontWeight: "bold",
    color: "#555"
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
