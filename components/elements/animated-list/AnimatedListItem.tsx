import React, { useRef } from "react";
import { View, Text } from "react-native";
import Animated, { Easing } from "react-native-reanimated";

type Props = {
  component: React.ReactNode;
  animation: Animated.Value<number>;
  height?: number;
};

export const AnimatedListItem = React.memo((props: Props) => {
  const height = props.animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, props.height | 0]
  });
  return (
    <Animated.View
      style={{
        flex: 1,
        height: props.height ? height : "auto",
        opacity: props.animation,
        borderWidth: 1
      }}
    >
      {props.component}
    </Animated.View>
  );
});
