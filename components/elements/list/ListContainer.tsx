import React from "react";
import { Card } from "../card/Card";

export const ListContainer = ({ children }) => {
  return (
    <Card
      style={{
        shadowOpacity: 0.2,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0
      }}
    >
      {children}
    </Card>
  );
};
