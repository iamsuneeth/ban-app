import React from "react";
import { render } from "@testing-library/react-native";
import { Amount } from "./Amount";

describe("tests for Amount component", () => {
  test("should render correctly", () => {
    const { queryByTestId, baseElement } = render(
      <Amount amount={23} currency="GBP" />
    );
    expect(queryByTestId("decimal")).not.toBeNull();
    expect(baseElement).toMatchSnapshot();
  });
});
