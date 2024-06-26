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

export type PaddedViewProps = ViewProps & {
  margin?: boolean;
  padding?: boolean;
  vertical?: boolean;
  horizontal?: boolean;
  size?: Sizes;
  children: any;
  viewRef?: React.LegacyRef<View>;
};

const calculateStyle = ({
  margin,
  padding,
  vertical,
  horizontal,
  size
}: {
  margin: boolean;
  padding: boolean;
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
  }

  if (padding && vertical) {
    style = { ...style, paddingVertical: SIZES[size] };
  } else if (padding && horizontal) {
    style = { ...style, paddingHorizontal: SIZES[size] };
  } else if (padding) {
    style = { ...style, padding: SIZES[size] };
  }
  return style;
};

export const PaddedView = ({
  children,
  margin = false,
  padding = true,
  size = "small",
  style,
  vertical,
  horizontal,
  viewRef,
  ...rest
}: PaddedViewProps) => {
  return (
    <View
      ref={viewRef}
      style={[
        {
          ...calculateStyle({ margin, padding, vertical, horizontal, size })
        },
        style
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};
