import React, { useRef, useEffect } from "react";
import {
  View,
  Platform,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { normalize } from "../../../utils/normalize";

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
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <TextInput
        ref={inputRef}
        placeholder={"Search"}
        clearButtonMode={"always"}
        selectionColor={"tomato"}
        style={{
          padding: normalize(10),
          flex: 1
        }}
        value={searchString}
        onChange={handleSearch}
      />
    </View>
  );
};
