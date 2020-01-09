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
import { normalize } from "../../../utils/normalize";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../../../App";

type Props = {
  handleSearch: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  searchString: string;
};

export const PayeeSearch = ({ handleSearch, searchString }: Props) => {
  const { colors } = useTheme() as ThemeType;
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder={"Search"}
        clearButtonMode={"always"}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus
        style={{
          padding: normalize(10),
          color: colors.text,
          flex: 1
        }}
        value={searchString}
        onChange={handleSearch}
      />
    </View>
  );
};
