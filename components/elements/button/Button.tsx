import React, { ReactNode } from "react";
import { Button as RNButton } from "react-native-paper";

import { useTheme } from "@react-navigation/native";
import { normalize } from "../../../utils/normalize";
import Animated from "react-native-reanimated";

const AnimatedButton = Animated.createAnimatedComponent(RNButton);

type ButtonProp = {
  children: ReactNode;
  primary?: boolean;
  secondary?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: any;
  contentStyle?: any;
  labelStyle?: any;
};

export const Button = ({
  children,
  primary,
  secondary,
  style,
  contentStyle,
  labelStyle,
  ...rest
}: ButtonProp) => {
  const { colors } = useTheme();
  return (
    <AnimatedButton
      {...rest}
      {...(primary && { mode: "contained" })}
      {...(secondary && {
        mode: "outlined"
      })}
      style={{
        marginVertical: normalize(5, "height"),
        height: normalize(40),
        ...style,
        ...(secondary && {
          borderColor: colors.primary,
          borderWidth: 1
        })
      }}
      contentStyle={{ borderRadius: 0, height: "100%", ...contentStyle }}
      labelStyle={{
        fontSize: normalize(12),
        fontWeight: "bold",
        ...labelStyle
      }}
    >
      {children}
    </AnimatedButton>
  );
};
