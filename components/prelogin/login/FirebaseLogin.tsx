import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  Keyboard,
  Dimensions
} from "react-native";
import Constants from "expo-constants";
import { WebView } from "react-native-webview";
import { FirebaseClient as firebase } from "bank-core";
import { RectButton } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import { User } from "firebase";
import { useLoginAnimation } from "../../../hooks/animation/useLoginAnimation";
import Animated from "react-native-reanimated";

const captchaUrl = "https://bank-d7ad7.firebaseapp.com";
const { width: screenWidth } = Dimensions.get("window");
const buttonWidth = screenWidth * 0.8;

const webViewScript = `
  setTimeout(function() { 
    window.postMessage('height'+document.documentElement.scrollHeight); 
  }, 500);
  true; // note: this is required, or you'll sometimes get silent failures
`;

export const FirebaseLogin = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [step, setStep] = useState("initial");
  const [authState, setAuthState] = useState("notStarted");
  const [initialized, setInitialized] = useState(false);
  const [smsCode, setSmsCode] = useState();
  const [verificationId, setVerificationId] = useState();
  const [webHeight, setWebHeight] = useState(100);

  const [
    startAnimation,
    stopAnimation,
    widthAnimation,
    borderRadiusAnimation,
    opacityAnimation,
    scaleAnimation,
    animation1,
    animation2
  ] = useLoginAnimation(navigation, buttonWidth);

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
    } else {
      setInitialized(true);
    }
  };

  const fetchStoredUserId = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    setPhoneNumber(userId);
  };

  useEffect(() => {
    const subscribed = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    fetchStoredUserId();
    return () => subscribed();
  }, []);

  const onGetMessage = async event => {
    const message = event.nativeEvent.data;

    if (String(message).indexOf("height") !== -1) {
      setWebHeight(parseFloat(String(message).replace("height", "")));
      return;
    }
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
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      smsCode
    );
    await firebase.auth().signInWithCredential(credential);
    setAuthState("completed");
  };

  return (
    initialized && (
      <ImageBackground
        source={require("../../../assets/login.jpg")}
        style={{ flex: 1 }}
      >
        <SafeAreaView
          style={{
            marginTop: Constants.statusBarHeight,
            justifyContent: "flex-end",
            flex: 1,
            paddingVertical: 100
          }}
        >
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
                  borderColor: "tomato",
                  color: "#fff",
                  marginBottom: 20,
                  width: buttonWidth
                }}
              />

              <RectButton
                onPress={() => setStep("phoneSubmitted")}
                style={{
                  backgroundColor: "tomato",
                  padding: 10,
                  height: 40,
                  width: buttonWidth,
                  justifyContent: "center",
                  borderRadius: 3
                }}
              >
                <Text style={{ textAlign: "center", color: "#fff" }}>
                  CONTINUE
                </Text>
              </RectButton>
            </KeyboardAvoidingView>
          )}

          {step === "phoneSubmitted" && (
            <View>
              <Text>{phoneNumber}</Text>
              <WebView
                injectedJavaScript={`getToken('${phoneNumber}');${webViewScript}`}
                source={{ uri: captchaUrl }}
                onMessage={onGetMessage}
                style={{ height: webHeight }}
              />
            </View>
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
              <TextInput
                placeholder="Verification code"
                value={smsCode}
                onChangeText={sms => setSmsCode(sms)}
                keyboardType="numeric"
                style={{
                  padding: 5,
                  height: 40,
                  borderBottomWidth: 1,
                  borderColor: "tomato",
                  color: "#fff",
                  marginBottom: 20,
                  width: buttonWidth
                }}
              />
              <Animated.View
                style={{
                  width: widthAnimation,
                  borderRadius: borderRadiusAnimation,
                  backgroundColor: "tomato",
                  padding: 10,
                  height: 40,
                  justifyContent: "center",
                  transform: [
                    {
                      scale: scaleAnimation as any
                    }
                  ]
                }}
              >
                <RectButton onPress={onSignIn}>
                  {authState === "notStarted" && (
                    <Text style={{ textAlign: "center", color: "#fff" }}>
                      VERIFY
                    </Text>
                  )}
                  {authState === "inProgress" && (
                    <ActivityIndicator color="#fff" />
                  )}
                </RectButton>
              </Animated.View>
            </KeyboardAvoidingView>
          )}
        </SafeAreaView>
      </ImageBackground>
    )
  );
};