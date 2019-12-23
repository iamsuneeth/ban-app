import React, { useState, useEffect, useReducer } from "react";
import { View, Text, FlatListProps, FlatList } from "react-native";
import { NativeViewGestureHandlerProperties } from "react-native-gesture-handler";
import { AnimatedListItem } from "./AnimatedListItem";
import _ from "lodash";

type IData<T> = {
  key: string;
  item: T;
  deleted: boolean;
};

const AnimatedList = <T extends { key?: string; id?: string | number }>(
  props: NativeViewGestureHandlerProperties & FlatListProps<T>
) => {
  if (!props.keyExtractor) {
    throw Error("keyExtractor prop is mandatory");
  }
  const cloneArray = listArray => {
    return listArray.map((item, index) => {
      return {
        key: props.keyExtractor(item, index),
        item,
        deleted: false
      };
    });
  };
  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    {
      data: cloneArray(props.data),
      exactData: props.data.slice()
    }
  );

  useEffect(() => {
    const modifiedData = props.data.map((item, index) => {
      item.key = props.keyExtractor(item, index);
      return item;
    });
    const deleted = _.differenceBy<IData<T>, T>(
      state.data,
      modifiedData,
      "key"
    ).map(item => {
      item.deleted = true;
      return item;
    });
    setState({
      exactData: [...props.data.slice(), ...deleted.map(item => item.item)],
      data: [...cloneArray(props.data), ...deleted]
    });
  }, [props.data]);

  const handleDelete = key => {
    setState({
      exactData: state.exactData.filter(
        (item, index) => props.keyExtractor(item, index) !== key
      ),
      data: state.data.filter(item => item.key !== key)
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
        return (
          <AnimatedListItem
            item={state.data[index]}
            component={propComponent}
            handleDelete={handleDelete}
          />
        );
      }}
    />
  );
};

export default AnimatedList;
