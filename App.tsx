import React from "react";
import "./config/firebase";
import {
  NavigationNativeContainer,
  DefaultTheme,
  DarkTheme
} from "@react-navigation/native";
import { initExtConfig } from "bank-core";
import { ExtInterfaceType } from "bank-core/src/types";
import { useColorScheme } from "react-native-appearance";
import { Animated } from "react-native";
import { RootStack } from "./stacks/RootStack";
import { colors } from "./theme/constants";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme
} from "react-native-paper";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Setting a timer"]);

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

// const BottomTabBar = createBottomTabNavigator(
//   {
//     Home: {
//       screen: HomeStack,
//       navigationOptions: {
//         tabBarLabel: "Home",
//         tabBarIcon: ({ tintColor }) => (
//           <Ionicons name="ios-home" color={tintColor} size={24} />
//         )
//       }
//     },
//     Payments: {
//       screen: PaymentStack,
//       navigationOptions: {
//         tabBarLabel: "Payments",
//         tabBarIcon: ({ tintColor }) => (
//           <MaterialIcons name="payment" color={tintColor} size={24} />
//         )
//       }
//     },
//     Stats: {
//       screen: Statistics,
//       navigationOptions: {
//         tabBarLabel: "Statistics",
//         tabBarIcon: ({ tintColor }) => (
//           <Foundation name="graph-bar" color={tintColor} size={24} />
//         )
//       }
//     },
//     More: {
//       screen: MoreStack,
//       navigationOptions: {
//         tabBarLabel: "More",
//         tabBarIcon: ({ tintColor }) => (
//           <Ionicons name="ios-more" color={tintColor} size={24} />
//         )
//       }
//     }
//   },
//   {
//     tabBarComponent: props => <TabBar {...props} />
//   }
// );

// const RootNavigator = createSwitchNavigator(
//   {
//     preLogin: createStackNavigator(
//       {
//         login: LoginContainer,
//         signUp: () => null,
//         reset: () => null
//       },
//       {
//         defaultNavigationOptions: {
//           header: null
//         },
//         transparentCard: true,

//         transitionConfig: (): any => ({
//           containerStyle: {
//             backgroundColor: "transparent"
//           }
//         })
//       }
//     ),
//     postLogin: createStackNavigator(
//       {
//         main: BottomTabBar,
//         modal: Modal
//       },
//       {
//         headerMode: "none",
//         mode: "modal",
//         cardStyle: {
//           backgroundColor: "rgba(0,0,0,0.6)"
//         },
//         transitionConfig: springyFadeIn,
//         defaultNavigationOptions: {
//           gesturesEnabled: false
//         }
//       }
//     )
//   },
//   {
//     initialRouteName: "preLogin"
//   }
// );

const provider = initExtConfig({
  API_URL: "",
  interfaceId: ExtInterfaceType.FIREBASE
});

const Theme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...colors.light
    }
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...colors.dark
    }
  }
};

const PaperTheme = {
  light: {
    ...PaperDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      ...colors.light,
      surface: PaperDefaultTheme.colors.surface
    }
  },
  dark: {
    ...PaperDarkTheme,
    colors: {
      ...PaperDarkTheme.colors,
      ...colors.dark,
      surface: PaperDarkTheme.colors.surface
    }
  }
};

export type ThemeType = typeof Theme.dark;

export default () => {
  const scheme = useColorScheme();

  return provider.createProvider(
    <PaperProvider
      theme={scheme === "dark" ? PaperTheme.dark : PaperTheme.light}
    >
      <NavigationNativeContainer
        theme={scheme === "dark" ? Theme.dark : Theme.light}
      >
        <RootStack />
      </NavigationNativeContainer>
    </PaperProvider>
  );
};
