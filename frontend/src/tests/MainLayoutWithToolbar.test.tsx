import React from "react";
import { render, screen } from "@testing-library/react";
import Loadscreen from "../components/Loadscreen";
import MainLayout from "../layout/MainLayout";
import { authedState, renderWithProviders } from "./test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MainLayoutWithToolbar from "../layout/MainLayoutWithToolbar";

describe("<Loadscreen/>", () => {
  it("should render the main layout with title and body and no toolbar", async () => {
    const mainLayout = renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayoutWithToolbar title="TestTitle">
                <div>Contents</div>
              </MainLayoutWithToolbar>
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

  it("should render the main layout with no title and with a body", async () => {
    const mainLayout = renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayoutWithToolbar>
                <div>Contents</div>
              </MainLayoutWithToolbar>
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

  it("should render the main layout with title and body", async () => {
    const mainLayout = renderWithProviders(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayoutWithToolbar
                title="TestTitle"
                toolbarContent={<div>Toolbar</div>}>
                <div>Contents</div>
              </MainLayoutWithToolbar>
            }
          />
        </Routes>
      </MemoryRouter>,
      { preloadedState: authedState }
    );

    const heading = screen.queryAllByText(/TestTitle/i)[0];
    const body = screen.queryByText(/Contents/i);
    const toolbar = screen.queryByText(/Toolbar/i)
    expect(heading).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(toolbar).toBeInTheDocument();
  });
});
