import React from "react";
import { rest } from "msw";
import { screen, waitFor } from "@testing-library/react";
import App from "../App";
import { authedState, renderWithProviders } from "./test-utils";
import { server } from "./server";
import { MemoryRouter } from "react-router-dom";
import { User } from "../models/User";

describe("<App />", () => {
  it("should successfully request refresh access token on render", async () => {
    localStorage.setItem("refreshToken", "testRefreshToken");
    const { store } = renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(store.getState().auth.token).toBe("testAccessToken");
    });
    localStorage.removeItem("refreshToken");
  });

  it("should fail to request refresh access token on render", async () => {
    localStorage.setItem("refreshToken", "testRefreshToken");

    server.use(
      rest.post(
        `${process.env.REACT_APP_API_URL}/auth/refresh/`,
        (req, res, ctx) => {
          return res(ctx.status(401));
        }
      )
    );

    const { store } = renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(store.getState().auth.token).toBeNull();
    });

    localStorage.removeItem("refreshToken");
  });

  it("should not successfully request refresh access token on render", async () => {
    const { store } = renderWithProviders(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(store.getState().auth.token).toBe(null);
    });
  });

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

  // it("handles error response", async () => {
  //   // force msw to return error response
  //   server.use(
  //     rest.get(
  //       "https://pokeapi.co/api/v2/pokemon/bulbasaur",
  //       (req, res, ctx) => {
  //         return res(ctx.status(500));
  //       }
  //     )
  //   );

  //   renderWithProviders(<App />);

  //   screen.getByText("Loading...");

  //   await screen.findByText("Oh no, there was an error");
  // });
});
