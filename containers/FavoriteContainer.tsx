import React from "react";
import { Favorites } from "../components/payments/paymentsOverview/Favorites";
import { useFavoriteState } from "bank-core";

export const FavoriteContainer = () => {
  const { favorites } = useFavoriteState();
  return <Favorites favorites={favorites} />;
};
