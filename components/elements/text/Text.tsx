import React from "react";
import {
  Text as RNText,
  Title,
  Headline,
  Subheading,
  Caption
} from "react-native-paper";
import { normalize } from "../../../utils/normalize";
import { TextStyle, StyleProp, TextProperties } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../../../App";

type TextProps = TextProperties & {
  type?: "header" | "sub" | "caption" | "main" | "error" | "link" | "section";
  children: any;
  center?: boolean;
  right?: boolean;
  style?: StyleProp<TextStyle>;
};
export const Text = ({
  type,
  children,
  style,
  center,
  right,
  ...rest
}: TextProps) => {
  const { colors } = useTheme() as ThemeType;
  const commonStyles = {
    textAlign: (center && "center") || (right && "right")
  };
  let Component = null;
  let styles = {};
  switch (type) {
    case "header":
      styles = { fontSize: normalize(20), fontWeight: "600" };
      break;
    case "sub":
      styles = { fontSize: normalize(20), fontWeight: "600" };
      break;
    case "caption":
      styles = { fontSize: normalize(12), color: colors.textSecondary };
      break;
    case "main":
      styles = { fontSize: normalize(18), fontWeight: "600" };
      break;
    case "error":
      styles = { fontSize: normalize(14), color: "red" };
      break;
    case "link":
      styles = { fontSize: normalize(14), color: colors.primaryDark };
      break;
    case "section":
      styles = {
        fontSize: normalize(16),
        fontWeight: "600",
        color: colors.sectionHeader
      };
      break;
    default:
      styles = { fontSize: normalize(14) };
  }
  return (
    <RNText
      style={
        style instanceof Array
          ? [styles, commonStyles, ...style]
          : [styles, commonStyles, style]
      }
    >
      {children}
    </RNText>
  );
};
