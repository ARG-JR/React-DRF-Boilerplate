import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { authedState, renderWithProviders } from "./test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SignUpView from "../views/auth/SignUpView";
import UserListView from "../views/users/UserListView";
import { server } from "./server";
import { rest } from "msw";

describe("<UserListView />", () => {
  it("should render the UserListView", async () => {
    const mainLayout = renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<UserListView />} />
        </Routes>
      </MemoryRouter>,
      { preloadedState: authedState }
    );

    const heading = screen.queryAllByText(/Loading/i)[0];
    expect(heading).toBeInTheDocument();

    waitFor(() => {
        const user = screen.queryAllByText(/Test Testerson/i)
        expect(user).toBeInTheDocument()
    })
  });

  it("should render the User list view with an error", async () => {
      server.use(
        rest.get(`${process.env.REACT_APP_API_URL}/users/`, (req, res, ctx) => {
          return res(ctx.status(401));
        })
      );
      
    const mainLayout = renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<UserListView />} />
        </Routes>
      </MemoryRouter>,
      { preloadedState: authedState }
    );

    const heading = screen.queryAllByText(/Loading/i)[0];
    expect(heading).toBeInTheDocument();

    waitFor(() => {
      const user = screen.queryAllByText(/Test Testerson/i);
      expect(user).toBeNull();

      const alert = screen.getByTestId("alert");
      expect(alert).toBeInTheDocument()
    });
  });



});
