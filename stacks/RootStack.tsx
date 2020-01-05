import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginContainer } from "../containers/LoginContainer";
import { Modal } from "../components/modal/Modal";
import { BottomTabBarStack } from "../tabs/BottomTabBar";
import { IAccount } from "bank-core/src/types";
import { useAuthState } from "bank-core";

export type RootParamsList = {
  Main: undefined;
  Modal:
    | {
        type?: "confirmation" | "auth" | "account" | "custom";
        snapPoints?: (number | string)[];
        onAccountSelection?: (account: IAccount) => void;
        renderProp?: (onClose: Function) => React.ReactNode;
        message?: string;
        onSelection?: (value: boolean) => void;
      }
    | undefined;
  Login: undefined;
};
const Stack = createStackNavigator<RootParamsList>();
export const RootStack = () => {
  const { authState } = useAuthState();
  return (
    <Stack.Navigator
      initialRouteName={!!authState.user ? "Main" : "Login"}
      headerMode="none"
      mode="modal"
    >
      {!!authState.user ? (
        <>
          <Stack.Screen name="Main" component={BottomTabBarStack} />
          <Stack.Screen
            name="Modal"
            component={Modal}
            options={{
              cardStyle: {
                backgroundColor: "transparent"
              },
              cardStyleInterpolator: ({ current, closing }) => ({
                cardStyle: {
                  opacity: current.progress
                }
              })
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginContainer} />
        </>
      )}
    </Stack.Navigator>
  );
};
