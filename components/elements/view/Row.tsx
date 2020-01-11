import React from "react";
import { ViewProps } from "react-native";
import { PaddedView, PaddedViewProps } from "./PaddedView";

type RowProps = PaddedViewProps;

export const Row: React.FC<RowProps> = ({ style, children, ...rest }) => {
  return (
    <PaddedView
      padding={false}
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        },
        style
      ]}
      {...rest}
    >
      {children}
    </PaddedView>
  );
};
