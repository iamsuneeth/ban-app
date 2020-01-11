import React from "react";
import { View, Text } from "react-native";
import { normalize } from "../../../utils/normalize";

const SPACES = {
  small: 5,
  medium: 10,
  large: 15,
  xLarge: 20,
  xxLarge: 50
};

type SpaceType = "small" | "medium" | "large" | "xLarge" | "xxLarge";

type SpacerProps = {
  vertical?: boolean;
  type?: SpaceType;
};

export const Spacer = ({ vertical = false, type = "small" }: SpacerProps) => {
  return (
    <View
      style={{
        ...(vertical
          ? { width: normalize(SPACES[type]) }
          : { height: normalize(SPACES[type], "height") })
      }}
    ></View>
  );
};
