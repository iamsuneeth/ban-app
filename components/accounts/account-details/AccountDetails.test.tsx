import React from "react";
import { AccountDetails } from "./AccountDetails";
import { render, fireEvent } from "@testing-library/react-native";
import { TestData } from "../../../test/data";

describe("Tests for AccountDetails component", () => {
  test("should render correctly", () => {
    const { baseElement } = render(
      <AccountDetails
        details={TestData.accountDetails}
        account={TestData.accounts[1]}
        fetchDetails={jest.fn()}
        navigate={jest.fn()}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });
  test("should call navigate on quick link clicks", () => {
    const navigateMock = jest.fn();
    const { queryByTestId } = render(
      <AccountDetails
        details={TestData.accountDetails}
        account={TestData.accounts[1]}
        fetchDetails={jest.fn()}
        navigate={navigateMock}
      />
    );

    fireEvent.press(queryByTestId("quick-link-payments"));
    fireEvent.press(queryByTestId("quick-link-transfers"));
    fireEvent.press(queryByTestId("quick-link-statements"));
    expect(navigateMock).toHaveBeenCalledTimes(3);
    expect(navigateMock).toHaveBeenNthCalledWith(
      1,
      "Payments",
      expect.objectContaining({
        accountId: expect.anything()
      })
    );
    expect(navigateMock).toHaveBeenNthCalledWith(
      2,
      "Transfers",
      expect.objectContaining({
        accountId: expect.anything()
      })
    );
    expect(navigateMock).toHaveBeenNthCalledWith(
      3,
      "Statements",
      expect.objectContaining({
        accountId: expect.anything()
      })
    );
  });
});
