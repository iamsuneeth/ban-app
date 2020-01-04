import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
  Dimensions
} from "react-native";
import Constants from "expo-constants";
import { WebView } from "react-native-webview";
import * as firebase from "firebase";
import { RectButton } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import { User } from "firebase";
import { useLoginAnimation } from "../../../hooks/animation/useLoginAnimation";
import Animated from "react-native-reanimated";
import { normalize } from "../../../utils/normalize";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import BottomSheet from "reanimated-bottom-sheet";
import { Card } from "../../elements/card/Card";
import LottieView from "lottie-react-native";

const captchaUrl = "https://bank-d7ad7.firebaseapp.com";
const { width: screenWidth } = Dimensions.get("window");
const buttonWidth = screenWidth * 0.8;

const webViewScript = phoneNumber => `
  getToken('${phoneNumber}'); 
`;

export const FirebaseLogin = ({
  navigation,
  modalVisible,
  authenticated,
  cancelAuthentication,
  sheetRef,
  biometryAvailable,
  authPrompt
}) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const animationRef = useRef<LottieView>();
  const [step, setStep] = useState("initial");
  const [authState, setAuthState] = useState("notStarted");
  const [error, setError] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [smsCode, setSmsCode] = useState();
  const [verificationId, setVerificationId] = useState();
  const [webHeight, setWebHeight] = useState(0);
  const { colors } = useTheme();
  const setAuthenticationState = () => {};
  const [
    startAnimation,
    stopAnimation,
    widthAnimation,
    borderRadiusAnimation,
    opacityAnimation,
    scaleAnimation,
    animation1,
    animation2,
    reverseAnimation
  ] = useLoginAnimation(setAuthenticationState, buttonWidth);

  const onAuthStateChanged = async (user: User) => {
    if (user) {
      const token = await firebase.auth().currentUser.getIdToken();
      if (token) {
        await SecureStore.setItemAsync(
          "userId",
          firebase.auth().currentUser.phoneNumber
        );
        stopAnimation();
      }
    }
  };

  const fetchStoredUserId = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    setPhoneNumber(userId);
  };

  const onClose = () => {
    cancelAuthentication();
  };

  useEffect(() => {
    if (!modalVisible) {
      const subscribed = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      fetchStoredUserId();
      if (authenticated) {
        animationRef.current.play();
      } else {
        setInitialized(true);
      }
      return subscribed;
    } else {
      sheetRef.current.snapTo(1);
    }
  }, [modalVisible]);

  const onGetMessage = async event => {
    const message = event.nativeEvent.data;

    switch (message) {
      case "DOMLoaded":
        return;
      case "ErrorSmsCode":
        // SMS Not sent or Captcha verification failed. You can do whatever you want here
        return;
      case "":
        return;
      default: {
        setStep("promptSmsCode");
        setVerificationId(message);
      }
    }
  };

  const onSignIn = async () => {
    Keyboard.dismiss();
    startAnimation();
    setAuthState("inProgress");
    setError("");
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      smsCode
    );
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    try {
      await firebase.auth().signInWithCredential(credential);
      setAuthState("completed");
    } catch (e) {
      setAuthState("notStarted");
      setError("Invalid verification code");
      reverseAnimation();
    }
  };
  return (
    <>
      {initialized && (
        <SafeAreaView
          style={{
            marginTop: Constants.statusBarHeight,
            justifyContent: "flex-end",
            flex: 1,
            paddingVertical: 100
          }}
        >
          <View
            style={{
              position: "absolute",
              top: "10%",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Ionicons name="ios-unlock" size={200} color={colors.primary} />
            <Text
              style={{
                fontSize: normalize(30),
                marginLeft: 10,
                fontWeight: "bold"
              }}
            >
              BitBank
            </Text>
          </View>
          {step === "initial" && (
            <KeyboardAvoidingView
              behavior="padding"
              enabled
              style={{
                paddingHorizontal: 10,
                marginBottom: 50,
                alignItems: "center"
              }}
              keyboardVerticalOffset={50}
            >
              <TextInput
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={phone => setPhoneNumber(phone)}
                style={{
                  padding: 5,
                  height: 40,
                  borderBottomWidth: 1,
                  borderColor: colors.primary,
                  color: colors.text,
                  marginBottom: 20,
                  width: buttonWidth,
                  fontSize: normalize(16)
                }}
                placeholderTextColor={colors.text}
              />

              <RectButton
                onPress={() => setStep("phoneSubmitted")}
                style={{
                  backgroundColor: colors.primary,
                  padding: 10,
                  height: 40,
                  width: buttonWidth,
                  justifyContent: "center",
                  borderRadius: 3
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontSize: normalize(16)
                  }}
                >
                  CONTINUE
                </Text>
              </RectButton>
              {biometryAvailable && (
                <RectButton
                  onPress={authPrompt}
                  style={{
                    padding: 10,
                    height: 40,
                    width: buttonWidth,
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: colors.primary,
                      fontSize: normalize(16)
                    }}
                  >
                    Login using fingerprint
                  </Text>
                </RectButton>
              )}
            </KeyboardAvoidingView>
          )}

          {step === "phoneSubmitted" && (
            <WebView
              injectedJavaScript={webViewScript(phoneNumber)}
              source={{ uri: captchaUrl }}
              onMessage={onGetMessage}
              style={{ backgroundColor: "transparent" }}
            />
          )}

          {step === "promptSmsCode" && (
            <KeyboardAvoidingView
              behavior="padding"
              enabled
              style={{
                paddingHorizontal: 10,
                marginBottom: 50,
                alignItems: "center"
              }}
              keyboardVerticalOffset={50}
            >
              {!!error && (
                <View
                  style={{
                    backgroundColor: "red",
                    padding: 5,
                    marginBottom: 10
                  }}
                >
                  <Text style={{ color: colors.text }}>{error}</Text>
                </View>
              )}
              <Text style={{ color: colors.text, fontSize: normalize(16) }}>
                We have sent you a verification code.
              </Text>
              <Text style={{ color: colors.text, fontSize: normalize(16) }}>
                Please enter it below.
              </Text>
              <TextInput
                placeholder="Verification code"
                value={smsCode}
                onChangeText={sms => setSmsCode(sms)}
                keyboardType="numeric"
                secureTextEntry
                style={{
                  marginTop: 10,
                  padding: 5,
                  height: 40,
                  borderBottomWidth: 1,
                  borderColor: colors.primary,
                  color: colors.text,
                  marginBottom: 20,
                  width: buttonWidth,
                  fontSize: normalize(16)
                }}
                placeholderTextColor={colors.text}
              />
              <Animated.View
                style={{
                  width: widthAnimation,
                  borderRadius: borderRadiusAnimation,
                  backgroundColor: !!smsCode ? colors.primary : colors.text,
                  height: 40,
                  justifyContent: "center",
                  transform: [
                    {
                      scale: scaleAnimation as any
                    }
                  ]
                }}
              >
                <RectButton
                  onPress={onSignIn}
                  style={{ flex: 1, padding: 10 }}
                  enabled={!!smsCode}
                >
                  {authState === "notStarted" && (
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        fontSize: normalize(16)
                      }}
                    >
                      VERIFY
                    </Text>
                  )}
                  {authState === "inProgress" && (
                    <ActivityIndicator color={"#fff"} />
                  )}
                </RectButton>
              </Animated.View>
              {authState === "notStarted" && (
                <RectButton
                  style={{
                    marginTop: 10,
                    height: 40,
                    justifyContent: "center",
                    width: buttonWidth,
                    backgroundColor: colors.text
                  }}
                  onPress={() => {
                    setStep("initial");
                    setSmsCode(null);
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#fff",
                      fontSize: normalize(16)
                    }}
                  >
                    CANCEL
                  </Text>
                </RectButton>
              )}
            </KeyboardAvoidingView>
          )}
        </SafeAreaView>
      )}
      <BottomSheet
        snapPoints={[0, "40%"]}
        ref={sheetRef}
        onOpenStart={() => setInitialized(true)}
        enabledContentTapInteraction={false}
        enabledGestureInteraction={false}
        enabledContentGestureInteraction={false}
        enabledBottomClamp
        onCloseStart={onClose}
        renderContent={() => (
          <View>
            <Card
              style={{
                marginHorizontal: 0,
                paddingBottom: 40,
                alignItems: "center",
                height: "100%"
              }}
            >
              <Text
                style={{
                  fontSize: normalize(20),
                  fontWeight: "bold",
                  color: colors.text
                }}
              >
                Fingerprint authentication
              </Text>
              {modalVisible && (
                <View style={{ marginTop: 40, alignItems: "center" }}>
                  <Ionicons name="ios-finger-print" size={100} />
                  <RectButton
                    style={{ width: 100, height: 40 }}
                    onPress={() => sheetRef.current.snapTo(0)}
                  >
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Text
                        style={{
                          fontSize: normalize(16),
                          fontWeight: "bold",
                          color: colors.primary,
                          textAlign: "center"
                        }}
                      >
                        Cancel
                      </Text>
                    </View>
                  </RectButton>
                </View>
              )}
              <LottieView
                ref={animationRef}
                loop={false}
                onAnimationFinish={() => navigation.navigate("Home")}
                autoSize
                source={require("../../../assets/fingerprint.json")}
              />
            </Card>
          </View>
        )}
      />
    </>
  );
};
