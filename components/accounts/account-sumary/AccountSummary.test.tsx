import React from "react";
import { render } from "@testing-library/react-native";
import { AccountSummary } from "./AccountSummary";

describe("tests for AccountSummary component", () => {
  test("should render correctly", () => {
    const { baseElement } = render(<AccountSummary />);
    expect(baseElement).toMatchSnapshot();
  });
});
