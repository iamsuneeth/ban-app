import React from "react";
import {
  createStackNavigator,
  StackViewTransitionConfigs
} from "react-navigation-stack";

import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { PaymentsOverview } from "../payments/paymentsOverview/PaymentsOverview";
import { Upcoming } from "../payments/upcoming/Upcoming";
import { FuturePayments } from "../payments/upcoming/FuturePayments";
import { ThemeColors } from "../../theme/constants";
import { PayeeContainer } from "../../containers/PayeeContainer";
import { PayeeSearchContainer } from "../../containers/PayeesSearchContainer";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { PayeeDetails } from "../payments/payees/PayeeDetails";
import { Animated } from "react-native";
import { MakePaymentContainer } from "../../containers/MakePaymentContainer";
import { PaymentReviewContainer } from "../../containers/PaymentReviewContainer";
import { ConfirmScreen } from "../payments/transferMoney/ConfirmScreen";

function springyFadeIn(transitionProps, prevTransitionProps) {
  const transitionSpec = {
    timing: Animated.spring,
    tension: 10,
    useNativeDriver: true
  };

  if (
    !(
      transitionProps.scene.route.routeName === "payeeDetails" ||
      (prevTransitionProps &&
        prevTransitionProps.scene.route.routeName === "payeeDetails" &&
        transitionProps.scene.route.routeName === "payees") ||
      (transitionProps.scene.route.routeName === "amountScreen" &&
        prevTransitionProps &&
        prevTransitionProps.scene.route.routeName !== "reviewScreen") ||
      (prevTransitionProps &&
        prevTransitionProps.scene.route.routeName === "amountScreen" &&
        transitionProps.scene.route.routeName === "payeeSelectionScreen")
    )
  ) {
    return StackViewTransitionConfigs.defaultTransitionConfig(
      transitionProps,
      prevTransitionProps
    );
  }

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

export const PaymentStack = createSharedElementStackNavigator(
  createStackNavigator,
  {
    Overview: createMaterialTopTabNavigator(
      {
        dashboard: {
          screen: PaymentsOverview,
          navigationOptions: {
            title: "Payments"
          }
        },
        upcoming: Upcoming,
        history: () => null
      },
      {
        navigationOptions: {
          title: "Payments"
        },
        tabBarOptions: {
          style: {
            backgroundColor: "#212121"
          },
          indicatorStyle: {
            backgroundColor: "#fff"
          },
          labelStyle: {
            fontWeight: "bold"
          }
        }
      }
    ),
    payeeSelectionScreen: {
      screen: MakePaymentContainer,
      navigationOptions: {
        header: null
      }
    },
    amountScreen: {
      screen: MakePaymentContainer,
      navigationOptions: {
        header: null
      }
    },
    reviewScreen: {
      screen: PaymentReviewContainer,
      navigationOptions: {
        title: "Review"
      }
    },
    confirmationScreen: {
      screen: ConfirmScreen,
      navigationOptions: {
        headerLeft: null,
        gesturesEnabled: false
      }
    },
    payees: {
      screen: PayeeContainer,
      navigationOptions: ({ navigation }) => ({
        headerTitle: props => <PayeeSearchContainer navigation={navigation} />,
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
    },
    payeeDetails: {
      screen: PayeeDetails,
      navigationOptions: {
        title: "Payee details"
      }
    },
    addPayee: {
      screen: () => null,
      navigationOptions: {
        title: "Add payee"
      }
    },
    futurePayments: {
      screen: FuturePayments,
      navigationOptions: {
        title: "Future payments"
      }
    },
    standingOrders: {
      screen: () => null,
      navigationOptions: {
        title: "Standing instructions"
      }
    },
    directDebits: {
      screen: () => null,
      navigationOptions: {
        title: "Direct debits"
      }
    }
  },
  {
    cardStyle: {
      backgroundColor: "#ffffff"
    },
    defaultNavigationOptions: ({ theme }) => ({
      headerStyle: {
        backgroundColor: "#212121",
        borderBottomWidth: 0
      },
      headerTitleStyle: {
        color: ThemeColors[theme].white
      }
    }),
    transitionConfig: springyFadeIn
  }
);
