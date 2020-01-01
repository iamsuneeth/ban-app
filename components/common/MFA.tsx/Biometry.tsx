import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export const Biometry = ({ animationRef }) => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        ref={animationRef}
        style={{
          width: 400,
          height: 400,
          backgroundColor: "#eee"
        }}
        source={require("../../../assets/fingerprint.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
});
