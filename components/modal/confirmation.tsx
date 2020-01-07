import React from "react";
import { View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";
import { normalize } from "../../utils/normalize";

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
        <RectButton
          style={{
            backgroundColor: colors.primary,
            height: normalize(40),
            margin: normalize(10),
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
              fontSize: normalize(16)
            }}
          >
            Confirm
          </Text>
        </RectButton>
        <RectButton
          style={{
            margin: normalize(10),
            flex: 1,
            height: normalize(40),
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
              borderWidth: normalize(1),
              justifyContent: "center",
              borderRadius: 3
            }}
          >
            <Text
              style={{
                textAlign: "center",
                textAlignVertical: "center",
                color: colors.primary,
                fontSize: normalize(16)
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
