import React from "react";
import { useDashboardState } from "bank-core";
import { Home } from "../components/home/Home";

export const HomeContainer = () => {
  const dashboardProps = useDashboardState();

  return <Home {...dashboardProps} />;
};
