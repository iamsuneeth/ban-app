import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Modal from "react-native-modal";
import { Card } from "../../elements/card/Card";
import {
  ScrollView,
  BorderlessButton,
  RectButton
} from "react-native-gesture-handler";
import { normalize } from "../../../utils/normalize";
import { LetterAvatar } from "../../common/LetterAvatar";
import BottomSheet from "reanimated-bottom-sheet";
import {
  MaterialCommunityIcons as Icons,
  Ionicons,
  FontAwesome
} from "@expo/vector-icons";
import BottomSheetBehavior from "reanimated-bottom-sheet";
export const PaymentsOverview = () => {
  const sheetRef = useRef<BottomSheetBehavior>();
  return (
    <View style={{ flex: 1, paddingBottom: 10, backgroundColor: "#f5f5f5" }}>
      <ScrollView>
        <Card
          style={{
            marginTop: 0,
            marginHorizontal: 0,
            shadowOpacity: 0.2
          }}
        >
          <RectButton>
            <View style={[styles.itemContainer]}>
              <View style={styles.icon}>
                <Icons name="bank-transfer-out" size={40} color="tomato" />
              </View>
              <View style={styles.main}>
                <Text style={styles.header}>Transfer money</Text>
                <Text numberOfLines={2} style={styles.description}>
                  Transfer money to anywhere
                </Text>
              </View>
            </View>
          </RectButton>
          <View style={styles.seperator}></View>
          <View>
            <RectButton>
              <View style={[styles.itemContainer]}>
                <View style={styles.icon}>
                  <Ionicons name="ios-people" size={40} color="tomato" />
                </View>
                <View style={styles.main}>
                  <Text style={styles.header}>Payees</Text>
                  <Text numberOfLines={2} style={styles.description}>
                    View and manage payees
                  </Text>
                </View>
              </View>
            </RectButton>
          </View>
        </Card>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.sectionHeader}>Recent payees</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {new Array(5).fill(20).map((elem, index) => (
              <BorderlessButton
                key={index}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10
                }}
              >
                <LetterAvatar text={`payee name`} />
                <Text style={{ color: "#333" }}>payee name</Text>
              </BorderlessButton>
            ))}
          </ScrollView>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.sectionHeader}>Favorites</Text>
          <Card style={{ paddingHorizontal: 0 }}>
            {new Array(10).fill(0).map((_, index) => (
              <View key={index}>
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                  <RectButton style={{ flex: 1 }}>
                    <View style={[styles.itemContainer]}>
                      <View style={styles.icon}>
                        <LetterAvatar
                          text={`payee name`}
                          size={50}
                          viewStyle={{
                            backgroundColor:
                              index % 2 == 0 ? "tomato" : "#039be5"
                          }}
                        />
                      </View>
                      <View style={styles.main}>
                        <Text style={styles.header}>Payee name</Text>
                        <Text style={styles.description}>
                          Account Number: 3423423432
                        </Text>
                        <Text style={styles.header}>£3344.00</Text>
                        <Text style={styles.description}>Payment type</Text>
                      </View>
                    </View>
                  </RectButton>
                  <BorderlessButton
                    style={{ justifyContent: "flex-end", paddingRight: 5 }}
                    onPress={() => sheetRef.current.snapTo(1)}
                  >
                    <Icons name="delete-forever" color="#555" size={25} />
                  </BorderlessButton>
                </View>
                {index !== new Array(10).length - 1 && (
                  <View style={styles.seperator} />
                )}
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>

      <BottomSheet
        snapPoints={[0, "40%"]}
        ref={sheetRef}
        enabledContentTapInteraction={false}
        enabledGestureInteraction={false}
        enabledContentGestureInteraction={false}
        renderContent={() => (
          <View>
            <Card
              style={{
                shadowOpacity: 0,
                height: "100%",
                justifyContent: "space-around"
              }}
            >
              <Text style={{ textAlign: "center" }}>
                Do you want to delete this favorite!?
              </Text>
              <View style={{ flexDirection: "row" }}>
                <RectButton
                  style={{
                    borderColor: "#039be5",
                    borderWidth: 1,
                    height: 40,
                    margin: 10,
                    flex: 1,
                    alignSelf: "center",
                    justifyContent: "center",
                    borderRadius: 3
                  }}
                  onPress={() => sheetRef.current.snapTo(0)}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      textAlignVertical: "center",
                      color: "#039be5",
                      fontSize: 16
                    }}
                  >
                    Confirm
                  </Text>
                </RectButton>
                <RectButton
                  style={{
                    borderColor: "#039be5",
                    borderWidth: 1,
                    margin: 10,
                    flex: 1,
                    height: 40,
                    alignSelf: "center",
                    justifyContent: "center",
                    borderRadius: 3
                  }}
                  onPress={() => sheetRef.current.snapTo(0)}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      textAlignVertical: "center",
                      color: "#039be5",
                      fontSize: 16
                    }}
                  >
                    Cancel
                  </Text>
                </RectButton>
              </View>
            </Card>
          </View>
        )}
      />
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
  sectionHeader: {
    fontSize: normalize(20),
    margin: 15,
    fontWeight: "bold",
    color: "#555"
  }
});
