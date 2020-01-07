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

type Props = {
  handleSearch: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  searchString: string;
};

export const PayeeSearch = ({ handleSearch, searchString }: Props) => {
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
