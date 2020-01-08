import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
  ActivityIndicator,
  Keyboard,
  Dimensions,
  Platform
} from "react-native";
import Constants from "expo-constants";
import { WebView } from "react-native-webview";
import * as firebase from "firebase";
import { RectButton } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import { User } from "firebase";
import { useLoginAnimation } from "../../../hooks/animation/useLoginAnimation";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import BottomSheet from "reanimated-bottom-sheet";
import { ThemeType } from "../../../App";

import { Button } from "../../elements/button/Button";
import { TextInput } from "../../elements/textInput/TextInput";
import LottieView from "lottie-react-native";
import { normalize } from "../../../utils/normalize";

const captchaUrl = "https://bank-d7ad7.firebaseapp.com";
const { width: screenWidth } = Dimensions.get("window");
const buttonWidth = screenWidth * 0.8;

const webViewScript = phoneNumber => `
  getToken('${phoneNumber}'); 
`;

type LoginProps = {
  onSuccess: (user: User) => void;
};

export const FirebaseLogin = ({ onSuccess }: LoginProps) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [step, setStep] = useState("initial");
  const [authState, setAuthState] = useState("notStarted");
  const [error, setError] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [smsCode, setSmsCode] = useState();
  const [verificationId, setVerificationId] = useState();
  const lottieRef = useRef<LottieView>();
  const setAuthenticationState = () => {
    onSuccess(firebase.auth().currentUser);
  };
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
        lottieRef.current.play();
      }
    }
  };

  const onAnimationEnd = () => {
    setAuthState("completed");
    stopAnimation();
  };

  const fetchStoredUserId = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    setPhoneNumber(userId);
    setInitialized(true);
  };

  useEffect(() => {
    const subscribed = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    fetchStoredUserId();
    return subscribed;
  }, []);

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
    try {
      await firebase.auth().signInWithCredential(credential);
    } catch (e) {
      setAuthState("notStarted");
      setError("Invalid verification code");
      reverseAnimation();
    }
  };
  const { colors, dark } = useTheme() as ThemeType;
  return (
    <>
      {initialized && (
        <SafeAreaView
          style={{
            marginTop: Constants.statusBarHeight,
            justifyContent: "flex-end",
            flex: 1
          }}
        >
          {step === "phoneSubmitted" && (
            <WebView
              injectedJavaScript={webViewScript(phoneNumber)}
              source={{ uri: captchaUrl }}
              onMessage={onGetMessage}
              style={{ backgroundColor: "transparent" }}
            />
          )}
          {step !== "phoneSubmitted" && (
            <KeyboardAvoidingView
              behavior="position"
              enabled
              style={{
                paddingHorizontal: 10,
                marginBottom: 50,
                flex: 1,
                alignItems: "center"
              }}
              keyboardVerticalOffset={50}
            >
              <View
                style={{
                  flex: 1,
                  maxWidth: "95%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {dark && (
                  <LottieView
                    ref={lottieRef}
                    loop={false}
                    resizeMode="cover"
                    onAnimationFinish={() => onAnimationEnd()}
                    style={{ width: 300 }}
                    source={require("../../../assets/logo_dark.json")}
                  />
                )}
                {!dark && (
                  <LottieView
                    ref={lottieRef}
                    loop={false}
                    speed={1.5}
                    resizeMode="cover"
                    onAnimationFinish={() => onAnimationEnd()}
                    style={{ width: 300 }}
                    source={require("../../../assets/logo_light.json")}
                  />
                )}
                <Text
                  style={{
                    fontSize: normalize(30),
                    marginLeft: 10,
                    fontWeight: "bold",
                    color: colors.text
                  }}
                >
                  BitBank
                </Text>
              </View>
              {step === "initial" && (
                <>
                  <TextInput
                    label="Phone Number"
                    value={phoneNumber}
                    onChangeText={phone => setPhoneNumber(phone)}
                    style={{
                      width: buttonWidth,
                      alignSelf: "center"
                    }}
                  />

                  <Button
                    primary
                    onPress={() => setStep("phoneSubmitted")}
                    disabled={!phoneNumber}
                    style={{ width: buttonWidth, alignSelf: "center" }}
                  >
                    CONTINUE
                  </Button>
                </>
              )}

              {step === "promptSmsCode" && (
                <>
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
                  <Text
                    style={{
                      color: colors.text,
                      marginTop: 40,
                      fontSize: normalize(16),
                      textAlign: "center"
                    }}
                  >
                    We have sent you a verification code.
                  </Text>
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: normalize(16),
                      textAlign: "center"
                    }}
                  >
                    Please enter it below.
                  </Text>
                  <TextInput
                    label="Verification code"
                    value={smsCode}
                    onChangeText={sms => setSmsCode(sms)}
                    keyboardType="numeric"
                    secureTextEntry
                    style={{
                      width: buttonWidth,
                      alignSelf: "center"
                    }}
                  />
                  <Animated.View
                    style={{
                      width: widthAnimation,
                      borderRadius: borderRadiusAnimation,
                      backgroundColor: colors.primary,
                      opacity: !!smsCode ? 1 : 0.6,
                      height: 40,
                      justifyContent: "center",
                      alignSelf: "center",
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
                    <Button
                      secondary
                      onPress={() => {
                        setStep("initial");
                        setSmsCode(null);
                      }}
                      style={{ width: buttonWidth, alignSelf: "center" }}
                    >
                      Cancel
                    </Button>
                  )}
                </>
              )}
            </KeyboardAvoidingView>
          )}
        </SafeAreaView>
      )}
    </>
  );
};
