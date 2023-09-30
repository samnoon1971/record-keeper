import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import List from "./List";
import { useSelector } from "react-redux";
import "@testing-library/jest-dom";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("List Component", () => {
  it("renders the component without errors", () => {
    // call initCats to populate the store
    render(<List />);
  });
  it("displays a table with the correct columns", () => {
    const cats = [
      { id: 1, name: "Felix", address: "123 street", birthdate: "2020-01-01" },
    ];
    useSelector.mockReturnValue({ cats });
    render(<List />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Birthdate")).toBeInTheDocument();
  });

  it("displays a paginated list of cats", () => {
    // create 6 mock cats
    const cats = [
      { id: 1, name: "Felix", address: "123 street", birthdate: "2020-01-01" },
      { id: 2, name: "Felix", address: "123 street", birthdate: "2020-01-01" },
      { id: 3, name: "Felix", address: "123 street", birthdate: "2020-01-01" },
      { id: 4, name: "Felix", address: "123 street", birthdate: "2020-01-01" },
      { id: 5, name: "Felix", address: "123 street", birthdate: "2020-01-01" },
      { id: 6, name: "Felix", address: "123 street", birthdate: "2020-01-01" },
    ];
    useSelector.mockReturnValue({ cats });
    render(<List />);
    expect(screen.getByText("Rows per page:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Go to next page/i,
      })
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", {
        name: /Go to next page/i,
      })
    );
    expect(
      screen.getByRole("button", {
        name: /Go to previous page/i,
      })
    ).toBeInTheDocument();
  });
});
