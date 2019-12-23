import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  handleSearch: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  searchString: string;
};

export const PayeeSearch = ({ handleSearch, searchString }: Props) => {
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
          padding: 10,
          flex: 1
        }}
        value={searchString}
        onChange={handleSearch}
      />
      {Platform.OS === "android" && (
        <Ionicons
          name="ios-close-circle"
          size={20}
          style={{ position: "absolute", right: 0, alignSelf: "center" }}
        />
      )}
    </View>
  );
};
