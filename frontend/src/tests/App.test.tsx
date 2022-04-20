import React from "react";
import { screen } from "@testing-library/react";
import App from "../App";
import { authedState, renderWithProviders } from "./test-utils";
import { MemoryRouter } from "react-router-dom";

describe("<App />", () => {
  it("should show login page for unauthenticated auth state", async () => {
    renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const heading = screen.getAllByText(/Sign In/i)[0];
    expect(heading).toBeInTheDocument();
  });

  it("should show dashboard page for authenticated user state", async () => {
    renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      {
        preloadedState: authedState,
      }
    );

    const heading = screen.queryAllByText(/Dashboard/i)[0];
    expect(heading).toBeInTheDocument();
  });

  it("should not show the login page for authenticated state", async () => {
    renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      {
        preloadedState: authedState,
      }
    );

    const heading = screen.queryAllByText(/Sign In/i)[0];
    expect(heading).toBeUndefined();
  });
});
