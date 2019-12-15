import React from "react";

import {
  createStackNavigator,
  StackViewTransitionConfigs
} from "react-navigation-stack";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { HomeContainer } from "../../containers/HomeContainer";
import { AccountDetailsContainer } from "../../containers/AccountDetailsContainer";
import { BorderlessButton } from "react-native-gesture-handler";
import { TransactionContainer } from "../../containers/TransactionContainer";
import { SearchContainer } from "../../containers/SearchContainer";
import { View, Text, Animated } from "react-native";
import { normalize } from "../../utils/normalize";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

function springyFadeIn() {
  const transitionSpec = {
    timing: Animated.spring,
    tension: 10,
    useNativeDriver: true
  };

  return {
    transitionSpec,
    screenInterpolator: ({ position, scene }) => {
      const { index } = scene;

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1]
      });

      return { opacity };
    }
  };
}

export const HomeStack = createSharedElementStackNavigator(
  createStackNavigator,
  {
    Accounts: {
      screen: HomeContainer,
      navigationOptions: {
        headerLeft: (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
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
        ),
        headerRight: (
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="bell-o" size={23} style={{ paddingRight: 10 }} />
            <MaterialIcons
              name="settings"
              size={25}
              style={{ paddingRight: 10 }}
            />
            <FontAwesome
              name="user-circle"
              size={25}
              style={{ paddingRight: 10 }}
            />
          </View>
        ),
        headerStyle: {
          borderBottomWidth: 0
        }
      }
    },
    AccountDetails: {
      screen: AccountDetailsContainer,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.name,
        headerTitleStyle: {
          fontWeight: "bold",
          flex: 1,
          textAlign: "center"
        }
      })
    },
    Transactions: {
      screen: TransactionContainer,
      navigationOptions: ({ navigation }) => ({
        headerTitle: props => <SearchContainer navigation={navigation} />,
        headerStyle: {
          backgroundColor: "#fff"
        },
        headerBackTitleStyle: {
          display: "none"
        },
        headerTitleContainerStyle: {
          right: 0,
          paddingRight: 5
        },
        headerRight: null
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: "#ffffff"
    },
    initialRouteName: "Accounts",
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: "bold",
        flex: 1,
        textAlign: "center"
      }
    },
    // transitionConfig: () => springyFadeIn()
    transitionConfig: () => StackViewTransitionConfigs.SlideFromRightIOS
  }
);
