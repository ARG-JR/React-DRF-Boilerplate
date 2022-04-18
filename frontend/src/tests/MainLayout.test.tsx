import React from "react";
import { screen } from "@testing-library/react";
import MainLayout from "../layout/MainLayout";
import { authedState, renderWithProviders } from "./test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("<MainLayout/>", () => {
  it("should render the main layout with title and body", async () => {
    const mainLayout = renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout title="TestTitle">
                <div>Contents</div>
              </MainLayout>
            }
          />
        </Routes>
      </MemoryRouter>,
      { preloadedState: authedState }
    );

    const heading = screen.queryAllByText(/TestTitle/i)[0];
    const body = screen.queryByText(/Contents/i);
    expect(heading).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it("should render the main layout with title and body", async () => {
    const mainLayout = renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <div>Contents</div>
              </MainLayout>
            }
          />
        </Routes>
      </MemoryRouter>,
      { preloadedState: authedState }
    );

    const heading = screen.queryAllByText(/TestTitle/i)[0];
    const body = screen.queryByText(/Contents/i);
    expect(heading).toBeUndefined();
    expect(body).toBeInTheDocument();
  });
});
