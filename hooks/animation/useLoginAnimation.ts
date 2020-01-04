import { useRef, useState } from "react";
import Animated, { Easing } from "react-native-reanimated";

const {
  timing,
  Value,
  Clock,
  set,
  cond,
  block,
  call,
  clockRunning,
  startClock,
  useCode,
  stopClock,
  divide
} = Animated;

function runTiming(value, dest, callBack) {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, block([stopClock(clock), call([], callBack)])),
    state.position
  ]);
}

export const useLoginAnimation = (
  finalCall,
  buttonWidth
): [
  Function,
  Function,
  Animated.Node<number>,
  Animated.Node<number>,
  Animated.Node<number>,
  Animated.Node<number>,
  Animated.Value<number>,
  Animated.Value<number>,
  Function
] => {
  const animation2 = useRef(new Value(0));
  const animation3 = useRef(new Value(0));
  const [play, setPlay] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [beginNavigation, setBeginNavigation] = useState(false);

  const width = animation2.current.interpolate({
    inputRange: [0, 1],
    outputRange: [buttonWidth, 40]
  });
  const opacity = animation2.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });
  const borderRadius = animation2.current.interpolate({
    inputRange: [0, 1],
    outputRange: [3, divide(width, 2)]
  });
  const scale = animation3.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 100]
  });

  const startAnimation = () => {
    setPlay(true);
    setReverse(false);
  };

  const reverseAnimation = () => {
    setPlay(false);
    setBeginNavigation(false);
    setReverse(true);
  };

  const callBack = () => {
    setPlay(false);
    setLoading(true);
  };

  useCode(() => {
    if (play) {
      return block([
        set(animation2.current, runTiming(animation2.current, 1, callBack))
      ]);
    }
    if (beginNavigation) {
      return set(
        animation3.current,
        runTiming(animation3.current, 1, finalCall)
      );
    }
    if (reverse) {
      return set(
        animation2.current,
        runTiming(animation2.current, 0, () => null)
      );
    }
    return animation2.current;
  }, [play, beginNavigation, reverse]);

  const stopAnimation = () => {
    setBeginNavigation(true);
  };

  return [
    startAnimation,
    stopAnimation,
    width,
    borderRadius,
    opacity,
    scale,
    animation2.current,
    animation3.current,
    reverseAnimation
  ];
};
