import React from "react";
import { render } from "@testing-library/react-native";
import { AccountSummary } from "./AccountSummary";
import { TestData } from "../../../test/data";

describe("tests for AccountSummary component", () => {
  test("should render correctly", () => {
    const { baseElement } = render(
      <AccountSummary summary={TestData.summary} />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
