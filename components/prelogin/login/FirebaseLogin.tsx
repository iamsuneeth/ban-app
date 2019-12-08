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
import { normalize } from "../../../utils/normalize";
import { Ionicons } from "@expo/vector-icons";

const captchaUrl = "https://bank-d7ad7.firebaseapp.com";
const { width: screenWidth } = Dimensions.get("window");
const buttonWidth = screenWidth * 0.8;

const webViewScript = phoneNumber => `
  getToken('${phoneNumber}'); 
`;

export const FirebaseLogin = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [step, setStep] = useState("initial");
  const [authState, setAuthState] = useState("notStarted");
  const [error, setError] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [smsCode, setSmsCode] = useState();
  const [verificationId, setVerificationId] = useState();
  const [webHeight, setWebHeight] = useState(0);

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
    initialized && (
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
            top: "20%",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Ionicons name="ios-unlock" size={200} color="white" />
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
                borderColor: "tomato",
                color: "#fff",
                marginBottom: 20,
                width: buttonWidth,
                fontSize: normalize(16)
              }}
              placeholderTextColor={"#ccc"}
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
                style={{ backgroundColor: "red", padding: 5, marginBottom: 10 }}
              >
                <Text style={{ color: "#fff" }}>{error}</Text>
              </View>
            )}
            <Text style={{ color: "#fff", fontSize: normalize(16) }}>
              We have sent you a verification code.
            </Text>
            <Text style={{ color: "#fff", fontSize: normalize(16) }}>
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
                borderColor: "tomato",
                color: "#fff",
                marginBottom: 20,
                width: buttonWidth,
                fontSize: normalize(16)
              }}
              placeholderTextColor={"#ccc"}
            />
            <Animated.View
              style={{
                width: widthAnimation,
                borderRadius: borderRadiusAnimation,
                backgroundColor: !!smsCode ? "tomato" : "gray",
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
                  <ActivityIndicator color="#fff" />
                )}
              </RectButton>
            </Animated.View>
            {authState === "notStarted" && (
              <RectButton
                style={{
                  marginTop: 10,
                  height: 40,
                  justifyContent: "center",
                  width: buttonWidth
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
    )
  );
};
