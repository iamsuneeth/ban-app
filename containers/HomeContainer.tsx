import React from "react";
import { useDashboardState } from "bank-core";
import { Home } from "../components/home/Home";
import { NavigationStackProp } from "react-navigation-stack";

type Props = {
  navigation: NavigationStackProp<{}>;
};

export const HomeContainer = ({ navigation }: Props) => {
  const dashboardProps = useDashboardState();

  return <Home navigation={navigation} {...dashboardProps} />;
};
