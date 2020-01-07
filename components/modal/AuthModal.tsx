import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  BackHandler,
  AppState,
  AppStateStatus
} from "react-native";
import { Card } from "../elements/card/Card";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootParamsList } from "../../stacks/RootStack";
import { RouteProp, useTheme } from "@react-navigation/native";
import { ThemeType } from "../../App";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import * as firebase from "firebase/app";
import { useFocusEffect } from "@react-navigation/native";
import { useAuthState } from "bank-core";
import { RectButton } from "react-native-gesture-handler";

type ModalProps = {
  navigation: StackNavigationProp<RootParamsList, "AuthModal">;
  route: RouteProp<RootParamsList, "AuthModal">;
};

const defaultSnapPoints = [0, "100%"];

/** types
 * account
 * confirmation
 * custom
 * */

export const AuthModal = ({ navigation, route }: ModalProps) => {
  const sheetRef = useRef<BottomSheet>();
  const allowOnClose = useRef<boolean>();
  const animationRef = useRef(new Animated.Value(1));
  const lottieRef = useRef<LottieView>();
  const [modalVisible, setModalVisible] = useState(false);
  const { signOutSuccess, authSuccess, authFailure } = useAuthState();
  const opacity = animationRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });
  const type = route.params?.type ?? "lock";
  const onClose = () => {
    // hack due to issue https://github.com/osdnk/react-native-reanimated-bottom-sheet/issues/136
    if (allowOnClose.current) {
      if (type === "confirmation") {
        authSuccess();
      }
      navigation.goBack();
    }
  };
  const onOpenStart = () => {
    setModalVisible(true);
    allowOnClose.current = true;
  };
  const snapPoints = route.params?.snapPoints ?? defaultSnapPoints;

  const launchPrompt = async () => {
    try {
      const isBiometryAvailable = await LocalAuthentication.hasHardwareAsync();
      if (!isBiometryAvailable) {
        return;
      }
      const enabled = await SecureStore.getItemAsync("biometryEnabled");
      if (enabled) {
        if (Platform.OS === "android") {
          sheetRef.current.snapTo(1);
        }
        const results = await LocalAuthentication.authenticateAsync();
        if (results.success) {
          if (Platform.OS === "android") {
            setModalVisible(false);
            lottieRef.current.play();
          } else {
            if (type === "confirmation") {
              authSuccess();
            }
            navigation.goBack();
          }
        } else {
          if (type === "confirmation") {
            authFailure();
          }
        }
      } else {
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleStateChange = (state: AppStateStatus) => {
    if (state === "active" && navigation.isFocused()) {
      launchPrompt();
    }
  };
  useEffect(() => {
    launchPrompt();
    AppState.addEventListener("change", handleStateChange);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const handlePress = () => true;
      BackHandler.addEventListener("hardwareBackPress", handlePress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handlePress);
      };
    }, [])
  );
  const { colors } = useTheme() as ThemeType;
  const signOut = async () => {
    await firebase.auth().signOut();
    await SecureStore.deleteItemAsync("biometryEnabled");
    signOutSuccess();
  };
  return (
    <View style={{ flex: 1 }}>
      <BottomSheet
        snapPoints={snapPoints}
        ref={sheetRef}
        callbackNode={animationRef.current}
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
                backgroundColor: colors.surface
              }}
            >
              {type === "lock" && (
                <View
                  style={{
                    alignSelf: "flex-end"
                  }}
                >
                  <RectButton
                    style={{
                      width: 200,
                      height: 40,
                      paddingRight: 10,
                      justifyContent: "center"
                    }}
                    onPress={signOut}
                  >
                    <Text
                      style={{
                        color: colors.primary,
                        fontWeight: "bold",
                        textAlign: "right",
                        fontSize: 16,
                        textTransform: "uppercase"
                      }}
                    >
                      sign out
                    </Text>
                  </RectButton>
                </View>
              )}
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    color: colors.text,
                    textAlign: "center",
                    paddingHorizontal: 40
                  }}
                >
                  Confirm fingerprint to unlock the app
                </Text>

                {modalVisible && (
                  <View style={{ marginTop: 40, alignItems: "center" }}>
                    <Ionicons name="ios-finger-print" size={100} />
                  </View>
                )}
                {!modalVisible && (
                  <LottieView
                    ref={lottieRef}
                    loop={false}
                    style={{ width: 400 }}
                    onAnimationFinish={() => sheetRef.current.snapTo(0)}
                    autoSize
                    source={require("../../assets/fingerprint.json")}
                  />
                )}
              </View>
            </Card>
          </View>
        )}
      />
      <Animated.View
        {...StyleSheet.absoluteFill}
        style={{ backgroundColor: "rgba(0,0,0,0.8)", opacity }}
      ></Animated.View>
    </View>
  );
};
