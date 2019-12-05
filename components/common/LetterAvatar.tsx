import React from "react";
import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";

type props = {
  text: string;
  initials?: boolean;
  size?: number;
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const getLetter = (text: String) => text.substr(0, 1).toUpperCase();

export const LetterAvatar = ({
  text,
  initials = false,
  size = 60,
  viewStyle,
  textStyle
}: props) => {
  const strings = text.split(" ");
  let content = "";
  if (initials && strings.length > 1) {
    content = `${getLetter(strings[0])}${getLetter(strings[1])}`;
  } else {
    content = getLetter(strings[0]);
  }
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          marginBottom: 10,
          backgroundColor: "tomato",
          justifyContent: "center",
          alignContent: "center"
        },
        viewStyle
      ]}
    >
      <Text
        style={[
          {
            textAlign: "center",
            fontSize: size / 2,
            fontWeight: "bold",
            color: "#fff"
          },
          textStyle
        ]}
      >
        {content}
      </Text>
    </View>
  );
};
