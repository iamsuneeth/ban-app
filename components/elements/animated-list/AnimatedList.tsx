import React, { useEffect, useReducer, useRef } from "react";
import { FlatListProps, FlatList } from "react-native";
import { NativeViewGestureHandlerProperties } from "react-native-gesture-handler";
import { AnimatedListItem } from "./AnimatedListItem";
import { isEmpty, differenceBy, unionBy } from "lodash";
import Animated, { Easing } from "react-native-reanimated";

type IData<T> = {
  key: string;
  item: T;
  deleted: boolean;
};

const {
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  stopClock,
  block,
  useCode,
  call
} = Animated;

function runTiming(clock, value, dest, callBack = ([]) => {}) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 200,
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

type Props<T> = NativeViewGestureHandlerProperties &
  FlatListProps<T> & {
    listItemHeight?: number;
  };

const cloneArray = (listArray, keyExtractor) => {
  return listArray.map((item, index) => {
    return {
      key: keyExtractor(item, index),
      item,
      deleted: false
    };
  });
};
const getKeys = (array: readonly any[], keyExtractor) => {
  const keys = {};
  array.forEach(
    (element, index) => (keys[keyExtractor(element, index)] = true)
  );
  return keys;
};

const AnimatedList = <T extends { key?: string; id?: string | number }>(
  props: Props<T>
) => {
  if (!props.keyExtractor) {
    throw Error("keyExtractor prop is mandatory");
  }
  let latest = true;
  const appearAnimation = useRef<Animated.Value<number>>(new Value(0));
  const deleteAnimation = useRef<Animated.Value<number>>(new Value(1));
  const clockInRef = useRef(new Clock());
  const clockOutRef = useRef(new Clock());

  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    {
      data: cloneArray(props.data, props.keyExtractor),
      exactData: props.data.slice(),
      addedMap: getKeys(props.data, props.keyExtractor),
      deletedMap: {}
    }
  );

  useEffect(() => {
    const modifiedData = props.data.map((item, index) => {
      return {
        key: props.keyExtractor(item, index),
        item
      };
    });
    const deleted = differenceBy<IData<T>, { key: string; item: T }>(
      state.data,
      modifiedData,
      "key"
    );

    const added = differenceBy<{ key: string; item: T }, IData<T>>(
      modifiedData,
      state.data,
      "key"
    ).map(elem => elem.item);

    const newData = unionBy(modifiedData, state.data, "key");
    const newExactData = newData.map(elem => elem.item);

    const newDeleteMap = {};
    const newAddedMap = {};
    deleted.forEach(elem => (newDeleteMap[elem.key] = true));
    added.forEach(elem => (newAddedMap[elem.key] = true));
    if (!isEmpty(newAddedMap) || !isEmpty(newDeleteMap)) {
      setState({
        exactData: newExactData,
        data: newData,
        addedMap: newAddedMap,
        deletedMap: newDeleteMap
      });
    }
    return () => (latest = false);
  }, [props.data]);

  useCode(() => {
    if (!isEmpty(state.deletedMap)) {
      return set(
        deleteAnimation.current,
        runTiming(clockOutRef.current, 1, 0, handleDelete)
      );
    }
    return deleteAnimation.current;
  }, [state.deletedMap]);

  useCode(() => {
    if (!isEmpty(state.addedMap)) {
      return set(
        appearAnimation.current,
        runTiming(clockInRef.current, 0, 1, handleAppearEnd)
      );
    }
    return appearAnimation.current;
  }, [state.addedMap]);

  const handleDelete = () => {
    if (latest) {
      setState({
        exactData: props.data.slice(),
        data: cloneArray(props.data, props.keyExtractor),
        deleteMap: {}
      });
      deleteAnimation.current.setValue(1);
    }
  };

  const handleAppearEnd = () => {
    setState({
      addedMap: {}
    });
  };

  return (
    <FlatList
      {...props}
      data={state.exactData}
      renderItem={({ item, index, ...rest }) => {
        const propComponent = props.renderItem({
          item,
          index,
          ...rest
        });
        const key = props.keyExtractor(item, index);
        return (
          <AnimatedListItem
            height={props.listItemHeight}
            animation={
              key in state.deletedMap
                ? deleteAnimation.current
                : appearAnimation.current
            }
            component={propComponent}
          />
        );
      }}
    />
  );
};

export default AnimatedList;
