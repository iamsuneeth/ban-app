import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AnimatedList from "../../elements/animated-list/AnimatedList";
import { IPayeeFilter, IPayee } from "bank-core/src/types";
import { RectButton } from "react-native-gesture-handler";
import { normalize } from "../../../utils/normalize";
import { LetterAvatar } from "../../common/LetterAvatar";

type props = {
  payees: IPayee[];
  loading: boolean;
  filterPayees: (filter: IPayeeFilter) => void;
};

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

export const Payees = ({ payees, loading }: props) => {
  return (
    <View style={{ flex: 1 }}>
      <AnimatedList
        data={payees}
        listItemHeight={100}
        keyExtractor={(item, index) => item.id}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
        renderItem={({ item, index }) => (
          <View key={item.id} style={{ flex: 1 }}>
            <RectButton style={{ flex: 1 }}>
              <View style={[styles.itemContainer]}>
                <View style={styles.icon}>
                  <LetterAvatar
                    text={item.name}
                    size={50}
                    viewStyle={{
                      backgroundColor: colorList[index % 5].background
                    }}
                    textStyle={{
                      color: colorList[index % 5].text
                    }}
                  />
                </View>
                <View style={styles.main}>
                  <Text style={styles.header}>{item.name}</Text>
                  <Text style={styles.description}>
                    Account Number: {item.accountNumber}
                  </Text>
                  <Text style={styles.description}>{item.code}</Text>
                </View>
              </View>
            </RectButton>
          </View>
        )}
      />
    </View>
  );
};

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
  }
});
