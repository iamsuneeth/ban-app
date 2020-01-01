import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInput,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeColors } from "../../../theme/constants";
import { useTheme } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import { RectButton } from "react-native-gesture-handler";
import { normalize } from "../../../utils/normalize";

type Props = {
  handleSearch: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  searchString: string;
  navigation: NavigationStackProp;
};

export const PayeeSearch = ({
  handleSearch,
  searchString,
  navigation
}: Props) => {
  const themeColors = ThemeColors[useTheme()];
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder={"Search"}
        clearButtonMode={"always"}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
        style={{
          padding: 10,
          flex: 1
        }}
        value={searchString}
        onChange={handleSearch}
      />
    </View>
  );
};
