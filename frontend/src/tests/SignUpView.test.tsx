import React from "react";
import { screen } from "@testing-library/react";
import { authedState, renderWithProviders } from "./test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SignUpView from "../views/auth/SignUpView";

describe("<SignUpView />", () => {
  it("should render the signup view", async () => {
    const mainLayout = renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <SignUpView />
            }
          />
        </Routes>
      </MemoryRouter>,
      { preloadedState: authedState }
    );

    const heading = screen.queryAllByText(/Sign Up/i)[0];
    expect(heading).toBeInTheDocument();
  });
});
