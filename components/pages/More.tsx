import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { FirebaseClient as firebase } from "bank-core";
export const More = ({ navigation }) => {
  const signOut = async () => {
    await firebase.auth().signOut();
    navigation.navigate("login");
  };
  return (
    <View style={styles.container}>
      <Button title="logout" onPress={signOut} />
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
