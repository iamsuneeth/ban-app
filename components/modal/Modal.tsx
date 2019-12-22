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

type ModalProps = {
  navigation: NavigationStackProp;
};

const { cond, set, eq } = Animated;

export const Modal = ({ navigation }: ModalProps) => {
  const themeColors = ThemeColors[useTheme()];
  const sheetRef = useRef<BottomSheet>();
  useEffect(() => {
    sheetRef.current.snapTo(1);
  }, []);
  const onConfirm = () => {
    sheetRef.current.snapTo(0);
  };
  const onClose = () => {
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        snapPoints={[0, 300]}
        ref={sheetRef}
        enabledContentTapInteraction={false}
        enabledGestureInteraction={false}
        enabledContentGestureInteraction={false}
        onCloseStart={onClose}
        renderContent={() => (
          <View>
            <Card
              style={{
                shadowOpacity: 0,
                marginHorizontal: 0,
                paddingBottom: 50,
                height: "100%",
                justifyContent: "space-around"
              }}
            >
              <Text style={{ textAlign: "center", fontSize: normalize(16) }}>
                Do you want to delete this favorite!?
              </Text>
              <View style={{ flexDirection: "row" }}>
                <RectButton
                  style={{
                    backgroundColor: themeColors.primaryDark,
                    height: 40,
                    margin: 10,
                    flex: 1,
                    alignSelf: "center",
                    justifyContent: "center",
                    borderRadius: 3
                  }}
                  onPress={() => sheetRef.current.snapTo(0)}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      textAlignVertical: "center",
                      color: themeColors.white,
                      fontSize: 16
                    }}
                  >
                    Confirm
                  </Text>
                </RectButton>
                <RectButton
                  style={{
                    borderColor: themeColors.primaryDark,
                    borderWidth: 1,
                    margin: 10,
                    flex: 1,
                    height: 40,
                    alignSelf: "center",
                    justifyContent: "center",
                    borderRadius: 3
                  }}
                  onPress={() => sheetRef.current.snapTo(0)}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      textAlignVertical: "center",
                      color: themeColors.primaryDark,
                      fontSize: 16
                    }}
                  >
                    Cancel
                  </Text>
                </RectButton>
              </View>
            </Card>
          </View>
        )}
      />
    </View>
  );
};
