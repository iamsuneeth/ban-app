import React, { useRef, useEffect } from "react";
import {
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInput
} from "react-native";
import { normalize } from "../../../utils/normalize";
import { useTheme } from "@react-navigation/native";
import { ThemeType } from "../../../App";

type Props = {
  handleSearch: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  searchString: string;
};

export const TransactionSearch = ({ handleSearch, searchString }: Props) => {
  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const { colors } = useTheme() as ThemeType;
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <TextInput
        ref={inputRef}
        placeholder={"Search"}
        clearButtonMode={"always"}
        selectionColor={"tomato"}
        style={{
          padding: normalize(10),
          flex: 1,
          color: colors.text
        }}
        value={searchString}
        onChange={handleSearch}
      />
    </View>
  );
};
