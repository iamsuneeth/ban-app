import React, { useRef } from "react";
import { View, Text } from "react-native";
import Animated, { Easing } from "react-native-reanimated";

type Props = {
  component: React.ReactNode;
  handleDelete: Function;
  item: {
    key: string;
    item: any;
    deleted: boolean;
  };
};

const {
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  block,
  useCode,
  call,
  eq
} = Animated;

function runTiming(clock, value, dest, callBack = () => {}) {
  //const newClock = new Clock();
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
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest)
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, [stopClock(clock), call([], callBack)]),
    // we made the block return the updated position
    state.position
  ]);
}

export const AnimatedListItem = React.memo((props: Props) => {
  const ref = useRef(new Value(0));
  const clockInRef = useRef(new Clock());
  const clockOutRef = useRef(new Clock());
  const initialRef = useRef(new Value(0));
  useCode(() => {
    if (!props.item.deleted) {
      return cond(
        eq(initialRef.current, 1),
        set(ref.current, runTiming(clockInRef.current, 0, 1)),
        block([set(initialRef.current, 1), set(ref.current, 1)])
      );
    }
    return ref.current;
  }, [props.item.key]);

  useCode(() => {
    if (props.item.deleted) {
      return set(
        ref.current,
        runTiming(clockOutRef.current, 1, 0, () =>
          props.handleDelete(props.item.key)
        )
      );
    }
    return ref.current;
  }, [props.item.deleted]);

  return (
    <Animated.View style={{ flex: 1, opacity: ref.current, borderWidth: 1 }}>
      {props.component}
    </Animated.View>
  );
});
