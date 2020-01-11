import React, { useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Card } from "../elements/card/Card";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { confirmation } from "./confirmation";
import { AccountSelection } from "../../containers/AccountSelection";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamsList } from "../../stacks/RootStack";
import { RouteProp, useTheme } from "@react-navigation/native";
import { Spacer } from "../elements/utils/Spacer";

type ModalProps = {
  navigation: StackNavigationProp<RootParamsList, "Modal">;
  route: RouteProp<RootParamsList, "Modal">;
};

const defaultSnapPoints = [0, 300];

/** types
 * account
 * confirmation
 * custom
 * */

export const Modal = ({ navigation, route }: ModalProps) => {
  const sheetRef = useRef<BottomSheet>();
  const allowOnClose = useRef<boolean>();
  const animationRef = useRef(new Animated.Value(1));
  const opacity = animationRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });
  const type = route.params?.type ?? "confirmation";
  const onClose = () => {
    // hack due to issue https://github.com/osdnk/react-native-reanimated-bottom-sheet/issues/136
    if (allowOnClose.current) {
      navigation.goBack();
    }
  };
  const onOpenStart = () => {
    allowOnClose.current = true;
  };
  let renderData = null;
  const snapPoints = route.params?.snapPoints ?? defaultSnapPoints;
  let extraStyles = null;
  let dismissable = route.params?.dismissable ?? false;
  switch (type) {
    case "confirmation":
      renderData = confirmation({
        sheetRef,
        onSelection: route.params?.onSelection,
        message: route.params?.message
      });
      extraStyles = { justifyContent: "space-around" };
      break;
    case "account":
      renderData = (
        <AccountSelection
          onSelection={route.params?.onAccountSelection}
          sheetRef={sheetRef}
        />
      );
      break;
    case "custom":
      renderData = route.params?.renderProp(() => sheetRef.current.snapTo(0));
      break;
    default:
      renderData = null;
  }
  useEffect(() => {
    sheetRef.current.snapTo(1);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        snapPoints={snapPoints}
        ref={sheetRef}
        callbackNode={animationRef.current}
        enabledContentTapInteraction={false}
        enabledGestureInteraction={dismissable}
        enabledContentGestureInteraction={dismissable}
        onCloseEnd={onClose}
        onOpenStart={onOpenStart}
        enabledBottomClamp
        renderContent={() => (
          <View>
            <Card
              style={{
                shadowOpacity: 0,
                height: "100%",
                ...extraStyles
              }}
            >
              {renderData}
              <Spacer type="xLarge" />
              <Spacer type="xLarge" />
            </Card>
          </View>
        )}
      />
      <Animated.View
        {...StyleSheet.absoluteFill}
        style={{ backgroundColor: "rgba(0,0,0,0.6)", opacity }}
      ></Animated.View>
    </View>
  );
};
