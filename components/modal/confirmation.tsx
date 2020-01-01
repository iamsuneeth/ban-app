import React from "react";
import { View, Text } from "react-native";
import { normalize } from "../../utils/normalize";
import { RectButton } from "react-native-gesture-handler";
import { ThemeColors } from "../../theme/constants";
import { useTheme } from "react-navigation";

export const confirmation = ({ sheetRef, message, onSelection }) => {
  const themeColors = ThemeColors[useTheme()];
  return (
    <>
      <Text style={{ textAlign: "center", fontSize: normalize(16) }}>
        {message}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <RectButton
          style={{
            backgroundColor: themeColors.primaryDark,
            height: 40,
            margin: 10,
            flex: 1,
            alignSelf: "center",
            justifyContent: "center",
            borderRadius: 3
          }}
          onPress={() => {
            sheetRef.current.snapTo(0);
            onSelection(true);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              textAlignVertical: "center",
              color: themeColors.white,
              fontSize: 16
            }}
          >
            Confirm
          </Text>
        </RectButton>
        <RectButton
          style={{
            borderColor: themeColors.primaryDark,
            borderWidth: 1,
            margin: 10,
            flex: 1,
            height: 40,
            alignSelf: "center",
            justifyContent: "center",
            borderRadius: 3
          }}
          onPress={() => {
            sheetRef.current.snapTo(0);
            onSelection(false);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              textAlignVertical: "center",
              color: themeColors.primaryDark,
              fontSize: 16
            }}
          >
            Cancel
          </Text>
        </RectButton>
      </View>
    </>
  );
};
