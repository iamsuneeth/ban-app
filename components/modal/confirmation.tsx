import React from "react";
import { View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";
import { normalize } from "../../utils/normalize";
import { Button } from "../elements/button/Button";

export const confirmation = ({ sheetRef, message, onSelection }) => {
  const { colors } = useTheme();
  return (
    <>
      <Text
        style={{
          textAlign: "center",
          fontSize: normalize(16),
          color: colors.text
        }}
      >
        {message}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          primary
          style={{ margin: normalize(10), flex: 1, alignSelf: "center" }}
          onPress={() => {
            sheetRef.current.snapTo(0);
            onSelection && onSelection(true);
          }}
        >
          Confirm
        </Button>
        <Button
          secondary
          style={{ margin: normalize(10), flex: 1, alignSelf: "center" }}
          onPress={() => {
            sheetRef.current.snapTo(0);
            onSelection && onSelection(true);
          }}
        >
          Cancel
        </Button>
      </View>
    </>
  );
};
