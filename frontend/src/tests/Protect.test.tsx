import React from "react";
import { rest } from "msw";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import {
  authedStaffState,
  authedState,
  renderWithProviders,
} from "./test-utils";
import { server } from "./server";
import {
  MemoryRouter,
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { User } from "../models/User";
import Loadscreen from "../components/Loadscreen";
import Protect from "../components/auth/Protect";
import { createBrowserHistory } from "history";
import { act } from "react-dom/test-utils";

describe("<Protect/>", () => {
  it("should allow authenticated users through the protected route", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protect>
                <div>Protected by Basic Auth</div>
              </Protect>
            }
          />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: authedState,
      }
    );

    const heading = screen.getByText(/Protected by Basic Auth/i);
    expect(heading).toBeInTheDocument();
  });

  it("should not allow unauthenticated users through the protected route", async () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protect>
                <div>Protected by Basic Auth</div>
              </Protect>
            }
          />
          <Route
            path="/signin"
            element={
              <Protect inverse>
                <div>Sign In</div>
              </Protect>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const heading = screen.getByText(/Sign In/i);
    expect(heading).toBeInTheDocument();
  });

  it("should not allow authenticated users through the inverse protected route", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/signin"]}>
        <Routes>
          <Route
            path="/"
            element={
              <Protect>
                <div>Protected by Basic Auth</div>
              </Protect>
            }
          />
          <Route
            path="/signin"
            element={
              <Protect inverse>
                <div>Sign In</div>
              </Protect>
            }
          />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: authedState,
      }
    );

    const heading = screen.getByText(/Protected by Basic Auth/i);
    expect(heading).toBeInTheDocument();
  });

  it("should allow staff user to access staff protected route", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/staff"]}>
        <Routes>
          <Route
            path="/"
            element={
              <Protect>
                <div>Unprotected</div>
              </Protect>
            }
          />
          <Route
            path="/staff"
            element={
              <Protect staff>
                <div>Protected by Staff Auth</div>
              </Protect>
            }
          />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: authedStaffState,
      }
    );

    const heading = screen.getByText(/Protected by Staff Auth/i);
    expect(heading).toBeInTheDocument();
  });

  it("should not allow non-staff user to access staff protected route", async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={["/staff"]}>
        <Routes>
          <Route
            path="/"
            element={
              <Protect>
                <div>Unprotected</div>
              </Protect>
            }
          />
          <Route
            path="/staff"
            element={
              <Protect staff>
                <div>Protected by Staff Auth</div>
              </Protect>
            }
          />
        </Routes>
      </MemoryRouter>,
      {
        preloadedState: authedState,
      }
    );

    const heading = screen.getByText(/Unprotected/i);
    expect(heading).toBeInTheDocument();
  });
});
