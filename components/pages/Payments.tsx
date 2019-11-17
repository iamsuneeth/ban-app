import BottomSheet from "reanimated-bottom-sheet";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useTransition } from "../../hooks/animation/useTransition";
import Animated from "react-native-reanimated";
import { BorderlessButton } from "react-native-gesture-handler";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Card } from "../elements/card/Card";

const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);

class Sheet extends React.Component {
  renderContent = () =>
    [1, 2, 3, 4, 5, 6, 7, 8, 9].map(value => (
      <View
        key={value}
        style={{ height: 200, alignItems: "center", backgroundColor: "#fff" }}
      >
        <Text>dfsdfsdfsf</Text>
      </View>
    ));

  renderHeader = () => (
    <View
      style={{
        width: 50,
        height: 10,
        backgroundColor: "gray",
        borderRadius: 50,
        alignSelf: "center"
      }}
    ></View>
  );

  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          snapPoints={[600, 400, 300]}
          renderContent={this.renderContent}
          renderHeader={this.renderHeader}
          initialSnap={2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
    borderWidth: 1,
    borderColor: "#ccc"
  }
});

export const Payments = () => {
  const [expanded, setExpanded] = useState();
  const [animation, setInitial] = useTransition({ expanded, trigger: false });
  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300]
  });
  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.PI * 5]
  });
  return (
    <View style={{ flex: 1, marginTop: 100 }}>
      <Card>
        <Animated.View style={{ height }}>
          <Text>sdfsdf testing</Text>
        </Animated.View>
        <BorderlessButton
          onPress={() => {
            setInitial();
            setExpanded(state => !state);
          }}
          style={{
            position: "absolute",
            alignSelf: "center",
            bottom: -10
          }}
        >
          <AnimatedIcon
            name="downcircle"
            size={30}
            color="tomato"
            style={{ transform: [{ rotate: rotation }] }}
          />
        </BorderlessButton>
      </Card>

      <Sheet />
    </View>
  );
};
