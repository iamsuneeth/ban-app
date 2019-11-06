import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { AccountList } from "./AccountList";

jest.mock("react-native-gesture-handler", () => {});

describe("tests for AccountList component", () => {
  const navigation = {
    navigate: jest.fn(element => null)
  };
  test("should render correctly", () => {
    const { baseElement } = render(
      <AccountList navigation={navigation as any} />
    );
    expect(baseElement).toMatchSnapshot();
  });

  test("should call details navigation on account click", () => {
    const { queryAllByTestId } = render(
      <AccountList navigation={navigation as any} />
    );

    fireEvent.press(queryAllByTestId("accountClick")[0]);
    expect(navigation.navigate).toHaveBeenCalledWith("AccountDetails");
  });
});
