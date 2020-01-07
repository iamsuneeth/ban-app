import React from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";
import { normalize } from "../../../utils/normalize";

type Props = {
  content: React.ReactNode;
  color?: string;
  width?: number | string;
  rootStyle?: StyleProp<ViewStyle>;
};

export const Divider = ({
  content,
  color = "gray",
  width = "90%",
  rootStyle
}: Props) => {
  return (
    <View
      style={[
        {
          width,
          alignSelf: "center",
          height: normalize(1),
          position: "relative"
        },
        rootStyle
      ]}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: color
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignSelf: "center",
          bottom: -0.5
        }}
      >
        <View
          style={{
            width: normalize(20),
            height: normalize(10),
            borderRadius: 5,
            padding: normalize(2),
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {content}
        </View>
      </View>
    </View>
  );
};
