import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { normalize } from "../../../utils/normalize";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../../../App";
import { PaddedView, PaddedViewProps } from "../view/PaddedView";

type CardProps = PaddedViewProps & {
  fluid?: boolean;
  nopad?: boolean;
};

export const Card: React.FC<CardProps> = ({
  children,
  style,
  fluid,
  nopad = false,
  ...rest
}) => {
  const { colors } = useTheme() as ThemeType;
  return (
    <PaddedView
      size="medium"
      style={[
        styles.card,
        {
          flex: fluid ? 1 : 0,
          ...(nopad && { padding: 0 }),
          backgroundColor: colors.surface,
          shadowColor: colors.shadowColor
        },
        style
      ]}
      {...rest}
    >
      {children}
    </PaddedView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    shadowOffset: {
      width: normalize(0),
      height: normalize(3, "height")
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 2
  }
});
