import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SignUpForm from "../components/auth/SignUpForm";
import { setupStore } from "../store";
import { renderWithProviders } from "./test-utils";

describe("<SignUpForm />", () => {
  it("should render signup form input elements", () => {
      const form = renderWithProviders(
        <MemoryRouter initialEntries={["/signup"]}>
          <Routes>
              <Route path="/signup" element={<SignUpForm/>}/>
              <Route path="/signin" element={<div>Sign In</div>} />
          </Routes>
        </MemoryRouter>
      );

      const emailInput = form.getByPlaceholderText(/Email Address/i)
      const passwordInput = form.getAllByPlaceholderText(/Password/i)[0]
      const confirmPasswordInput = form.getByPlaceholderText(/Confirm Password/i)
      const usernameInput = form.getByPlaceholderText(/Username\/Handle/i)
      const firstNameInput = form.getByPlaceholderText(/First Name/i)
      const lastNameInput = form.getByPlaceholderText(/Last Name/i);
      const submitButton = form.getAllByText(/Sign Up/i)[1]

      expect(emailInput).toBeInTheDocument()
      expect(passwordInput).toBeInTheDocument();
      expect(confirmPasswordInput).toBeInTheDocument();
      expect(usernameInput).toBeInTheDocument();
      expect(firstNameInput).toBeInTheDocument();
      expect(lastNameInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();

  })

    it("should require passwords to match when submitting", () => {
      const form = renderWithProviders(
        <MemoryRouter initialEntries={["/signup"]}>
          <Routes>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signin" element={<div>Sign In</div>} />
          </Routes>
        </MemoryRouter>
      );

      const emailInput = form.getByPlaceholderText(/Email Address/i);
      const passwordInput = form.getAllByPlaceholderText(/Password/i)[0];
      const confirmPasswordInput =
        form.getByPlaceholderText(/Confirm Password/i);
      const usernameInput = form.getByPlaceholderText(/Username\/Handle/i);
      const firstNameInput = form.getByPlaceholderText(/First Name/i);
      const lastNameInput = form.getByPlaceholderText(/Last Name/i);
      const submitButton = form.getAllByText(/Sign Up/i)[1];

      fireEvent.change(emailInput, { target: { value: "test@test10.com" } });
      fireEvent.change(passwordInput, { target: { value: "test123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "test1231" } });
      fireEvent.change(usernameInput, { target: { value: "tester" } });
      fireEvent.change(firstNameInput, { target: { value: "test" } });
      fireEvent.change(lastNameInput, { target: { value: "testerson" } });

      fireEvent.click(submitButton)

      const errorMessage = form.getByText(/Passwords must match!/i)
      expect(errorMessage).toBeInTheDocument()
    });

    it("should redirect to signin page on successful signup", () => {
      const form = renderWithProviders(
        <MemoryRouter initialEntries={["/signup"]}>
          <Routes>
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/signin" element={<div>Sign In</div>} />
          </Routes>
        </MemoryRouter>
      );

      const emailInput = form.getByPlaceholderText(/Email Address/i);
      const passwordInput = form.getAllByPlaceholderText(/Password/i)[0];
      const confirmPasswordInput =
        form.getByPlaceholderText(/Confirm Password/i);
      const usernameInput = form.getByPlaceholderText(/Username\/Handle/i);
      const firstNameInput = form.getByPlaceholderText(/First Name/i);
      const lastNameInput = form.getByPlaceholderText(/Last Name/i);
      const submitButton = form.getAllByText(/Sign Up/i)[1];

      fireEvent.change(emailInput, { target: { value: "test@test10.com" } });
      fireEvent.change(passwordInput, { target: { value: "test123" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "test123" } });
      fireEvent.change(usernameInput, { target: { value: "tester" } });
      fireEvent.change(firstNameInput, { target: { value: "test" } });
      fireEvent.change(lastNameInput, { target: { value: "testerson" } });

      fireEvent.click(submitButton);

      const signinPage = form.getByText(/Sign In/i);
      expect(signinPage).toBeInTheDocument();
    });
})