import React from "react";
import { View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";

export const confirmation = ({ sheetRef, message, onSelection }) => {
  const { colors } = useTheme();
  return (
    <>
      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          color: colors.text
        }}
      >
        {message}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <RectButton
          style={{
            backgroundColor: colors.primary,
            height: 40,
            margin: 10,
            flex: 1,
            alignSelf: "center",
            justifyContent: "center",
            borderRadius: 3
          }}
          onPress={() => {
            sheetRef.current.snapTo(0);
            onSelection && onSelection(true);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              textAlignVertical: "center",
              color: "#fff",
              fontSize: 16
            }}
          >
            Confirm
          </Text>
        </RectButton>
        <RectButton
          style={{
            margin: 10,
            flex: 1,
            height: 40,
            alignSelf: "center"
          }}
          onPress={() => {
            sheetRef.current.snapTo(0);
            onSelection && onSelection(false);
          }}
        >
          <View
            style={{
              flex: 1,
              borderColor: colors.primary,
              borderWidth: 1,
              justifyContent: "center",
              borderRadius: 3
            }}
          >
            <Text
              style={{
                textAlign: "center",
                textAlignVertical: "center",
                color: colors.primary,
                fontSize: 16
              }}
            >
              Cancel
            </Text>
          </View>
        </RectButton>
      </View>
    </>
  );
};
