import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SignInForm from "../components/auth/SignInForm";
import { setupStore } from "../store";
import { renderWithProviders } from "./test-utils";

describe("<SignInForm />", () => {
  it("should render signin form input elements", () => {
    const form = renderWithProviders(
      <MemoryRouter initialEntries={["/signin"]}>
        <Routes>
          <Route path="/signup" element={<div>Sign Up</div>} />
          <Route path="/signin" element={<SignInForm />} />
        </Routes>
      </MemoryRouter>
    );

    const emailInput = form.getByPlaceholderText(/Email Address/i);
    const passwordInput = form.getByPlaceholderText(/Password/i);
    const submitButton = form.getAllByText(/Sign In/i)[1];

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument()
  });

  it("should redirect to dashboard page on successful signup", () => {
    const form = renderWithProviders(
      <MemoryRouter initialEntries={["/signin"]}>
        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/signin" element={<SignInForm />} />
        </Routes>
      </MemoryRouter>
    );

    const store = form.store
    const emailInput = form.getByPlaceholderText(/Email Address/i);
    const passwordInput = form.getByPlaceholderText(/Password/i);
    const submitButton = form.getAllByText(/Sign In/i)[1];

    fireEvent.change(emailInput, { target: { value: "test@test10.com" } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });

    fireEvent.click(submitButton);

    waitFor(() => {
        const token = localStorage.getItem("refreshToken");
        expect(token).not.toBeNull()
        expect(token).toBe("refreshToken")
        expect(store.getState().auth.token).toBe("accessToken")
        const signinPage = form.getByText(/Dashboard/i);
        expect(signinPage).toBeInTheDocument();
    })

  });
});
