import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { FirebaseClient as firebase } from "bank-core";
import { createStackNavigator } from "react-navigation-stack";
import { Options } from "../more/Options";
import { Biometry } from "../more/Biometry";

export const MoreStack = createStackNavigator({
  options: {
    screen: Options,
    navigationOptions: {
      title: "More"
    }
  },
  manageBiometry: {
    screen: Biometry,
    navigationOptions: {
      title: "Manage biometry"
    }
  }
});
