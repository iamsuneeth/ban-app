import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Transfers = () => {
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

// const handlePan = event([
//   {
//     nativeEvent: ({ translationY: y, state, velocityY }) =>
//       block([
//         set(translateY, add(y, offsetY)),
//         set(stateVar,state),
//         set(dragY,velocityY),
//         cond(eq(state, State.END), [set(offsetY, add(offsetY, y))])
//       ])
//   }
// ]);
