import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Options } from "../components/more/Options";
import { Biometry } from "../components/more/Biometry";

const Stack = createStackNavigator();
export const MoreStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Options"
        component={Options}
        options={{ title: "Options" }}
      />
      <Stack.Screen
        name="Biometry"
        component={Biometry}
        options={{ title: "Biometry settings" }}
      />
    </Stack.Navigator>
  );
};
