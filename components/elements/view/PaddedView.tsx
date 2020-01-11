import React from "react";
import { View, Text } from "react-native";
import { ViewProps } from "react-native";
import { normalize } from "../../../utils/normalize";

const SIZES = {
  small: normalize(5),
  medium: normalize(10),
  large: normalize(15),
  xLarge: normalize(20),
  xxLarge: normalize(50)
};

type Sizes = "small" | "medium" | "large" | "xLarge" | "xxLarge";

type PaddedViewProps = ViewProps & {
  margin?: boolean;
  vertical?: boolean;
  horizontal?: boolean;
  size?: Sizes;
  children: any;
};

const calculateStyle = ({
  margin,
  vertical,
  horizontal,
  size
}: {
  margin: boolean;
  vertical: boolean;
  horizontal: boolean;
  size: Sizes;
}) => {
  let style = {};
  if (margin && vertical) {
    style = { marginVertical: SIZES[size] };
  } else if (margin && horizontal) {
    style = { marginHorizontal: SIZES[size] };
  } else if (margin) {
    style = { margin: SIZES[size] };
  } else if (vertical) {
    style = { paddingVertical: SIZES[size] };
  } else if (horizontal) {
    style = { paddingHorizontal: SIZES[size] };
  } else {
    style = { padding: SIZES[size] };
  }
  return style;
};

export const PaddedView = ({
  children,
  margin = false,
  size = "small",
  style,
  vertical,
  horizontal,
  ...rest
}: PaddedViewProps) => {
  return (
    <View
      style={{
        ...calculateStyle({ margin, vertical, horizontal, size }),
        ...(style as any)
      }}
    >
      {children}
    </View>
  );
};
