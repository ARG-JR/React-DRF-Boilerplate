import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "../layout/Header";
import { authedState, renderWithProviders } from "./test-utils";

describe("<Header />", () => {
  it("should logout when clicking the logout button", () => {
    const form = renderWithProviders(
      <MemoryRouter initialEntries={["/header"]}>
        <Routes>
          <Route path="/header" element={<Header />} />
          <Route path="/signin" element={<div>Sign In</div>} />
        </Routes>
      </MemoryRouter>,{
          preloadedState: authedState
      }
    );

    const myAccountLink = form.getByText(/My Account/i);
    
    fireEvent.click(myAccountLink)

    const signoutButton = form.getByText(/Sign Out/i);
    
    fireEvent.click(signoutButton)

    const signIn = form.getByText(/Sign In/i)
    expect(signIn).toBeInTheDocument()

  });
});
