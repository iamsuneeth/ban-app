import React, { useRef, useEffect, useState } from "react";
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
  handleSearch: (text: string) => void;
  searchString: string;
};

export const PayeeSearch = ({ handleSearch, searchString }: Props) => {
  const inputRef = useRef<TextInput>(null);
  const [text, setText] = useState(searchString);
  const setSearchString = event => {
    setText(event.nativeEvent.text);
    handleSearch(event.nativeEvent.text);
  };
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
        value={text}
        onChange={setSearchString}
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
