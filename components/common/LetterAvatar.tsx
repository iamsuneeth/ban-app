import React from "react";
import { View, StyleProp, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../../App";
import { normalize } from "../../utils/normalize";
import { Text } from "../elements/text/Text";

type props = {
  text: string;
  initials?: boolean;
  size?: number;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
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

const getLetter = (text: String) => text.substr(0, 1).toUpperCase();

export const LetterAvatar = ({
  text,
  initials = false,
  size = normalize(60),
  viewStyle,
  textStyle
}: props) => {
  const strings = text.split(" ");
  let content = "";
  let colorIndex;
  if (initials && strings.length > 1) {
    content = `${getLetter(strings[0])}${getLetter(strings[1])}`;
    colorIndex =
      (content.charCodeAt(0) +
        strings[0].length +
        content.charCodeAt(1) +
        strings[1].length) %
      5;
  } else {
    content = getLetter(strings[0]);

    colorIndex = (content.charCodeAt(0) + strings[0].length) % 5;
  }
  const { colors } = useTheme() as ThemeType;
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          marginBottom: normalize(10, "height"),
          backgroundColor: colors.avatarBackground,
          justifyContent: "center",
          alignContent: "center"
        },
        viewStyle
      ]}
    >
      <Text
        center
        style={[
          {
            textAlignVertical: "center",
            fontSize: size / 2,
            fontWeight: "bold",
            color: colors.background
          },
          textStyle
        ]}
      >
        {content}
      </Text>
    </View>
  );
};
