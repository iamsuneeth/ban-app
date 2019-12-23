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
import { IPayeeState } from "bank-core/src/types";

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
  payees: IPayeeState;
};
export const RecentPayees = ({ payees }: props) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={styles.sectionHeader}>Recent payees</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {payees.payees.map((elem, index) => (
          <BorderlessButton
            key={index}
            style={{
              justifyContent: "flex-start",
              alignItems: "center",
              margin: 10,
              width: 80
            }}
          >
            <LetterAvatar
              text={elem.name}
              viewStyle={{
                backgroundColor: colorList[index % 5].background
              }}
              textStyle={{
                color: colorList[index % 5].text
              }}
            />
            <Text numberOfLines={1} style={{ color: "#333" }}>
              {elem.name.split(" ")[0]}
            </Text>
          </BorderlessButton>
        ))}
      </ScrollView>
      <ActivityIndicator animating={payees.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: normalize(20),
    margin: 15,
    fontWeight: "bold",
    color: "#555"
  }
});
