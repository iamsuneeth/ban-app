import React, { useState, useRef, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { Card } from "../elements/card/Card";
import { RectButton } from "react-native-gesture-handler";
import { ThemeColors } from "../../theme/constants";
import { useTheme } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";
import Animated from "react-native-reanimated";
import { timing } from "react-native-redash";
import BottomSheet from "reanimated-bottom-sheet";
import { normalize } from "../../utils/normalize";
import { confirmation } from "./confirmation";
import {
  AccountSelection,
  AccountList
} from "../../containers/AccountSelection";
import MFAContainer from "../../containers/MFAContainer";

type ModalProps = {
  navigation: NavigationStackProp;
};

const { cond, set, eq } = Animated;

const defaultSnapPoints = [0, 300];

/** types
 * account
 * confirmation
 * custom
 * */

export const Modal = ({ navigation }: ModalProps) => {
  const sheetRef = useRef<BottomSheet>();
  const allowOnClose = useRef<boolean>();
  const type = navigation.getParam("type") || "confirmation";
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
  const snapPoints = navigation.getParam("snapPoints") || defaultSnapPoints;
  let extraStyles = null;
  switch (type) {
    case "confirmation":
      renderData = confirmation({
        sheetRef,
        onSelection: navigation.getParam("onSelection"),
        message: navigation.getParam("message")
      });
      extraStyles = { justifyContent: "space-around" };
      break;
    case "account":
      renderData = (
        <AccountList
          onSelection={navigation.getParam("onAccountSelection")}
          sheetRef={sheetRef}
        />
      );
      break;
    case "auth":
      renderData = <MFAContainer sheetRef={sheetRef} />;
      break;
    //extraStyles = { backgroundColor: "transparent" };
    case "custom":
      renderData = navigation.getParam("renderProp")(() =>
        sheetRef.current.snapTo(0)
      );
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
        enabledContentTapInteraction={false}
        enabledGestureInteraction={false}
        enabledContentGestureInteraction={false}
        onCloseEnd={onClose}
        onOpenStart={onOpenStart}
        enabledBottomClamp
        renderContent={() => (
          <View>
            <Card
              style={{
                shadowOpacity: 0,
                marginHorizontal: 0,
                paddingBottom: 40,
                height: "100%",
                ...extraStyles
              }}
            >
              {renderData}
            </Card>
          </View>
        )}
      />
    </View>
  );
};
