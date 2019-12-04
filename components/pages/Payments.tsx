import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import * as SecureStore from "expo-secure-store";

export const Payments = ({
  navigation
}: {
  navigation: NavigationStackProp<{}>;
}) => {
  useEffect(() => {
    console.log("jgg");
    // SecureStore.setItemAsync("suneeth", "tempValue", {
    //   keychainService: "iOS"
    // })
    //   .then(data => console.log(data))
    //   .catch(error => console.log(error));
    SecureStore.getItemAsync("suneeth", {
      keychainService: "iOS"
    })
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
