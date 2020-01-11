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
      ...Theme.light.colors,
      surface: PaperDefaultTheme.colors.surface
    }
  },
  dark: {
    ...PaperDarkTheme,
    colors: {
      ...PaperDarkTheme.colors,
      ...Theme.dark.colors,
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
