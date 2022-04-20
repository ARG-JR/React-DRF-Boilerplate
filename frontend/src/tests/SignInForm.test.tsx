import { act, fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import SignInForm from "../components/auth/SignInForm";
import { setCredentials } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks/store";
import { useLoginMutation } from "../services/authService";
import { renderWithProviders } from "./test-utils";

jest.mock("../hooks/store", () => {
  return {
    useAppDispatch: jest.fn(),
  };
});

jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: jest.fn(),
  };
});

jest.mock("../features/auth/authSlice", () => {
  return {
    setCredentials: jest.fn(),
  };
});
jest.spyOn(global.localStorage, "setItem");

jest.mock("../services/authService", () => {
  return {
    useLoginMutation: jest.fn(),
  };
});

describe("<SignInForm />", () => {
  let mockSetCredentials: jest.Mock;
  let mockUseAppDispatch: jest.Mock;
  let mockUseNavigate: jest.Mock;
  let mockLoginMutation: jest.Mock;

  beforeEach(() => {
    mockSetCredentials = jest.mocked(setCredentials) as jest.Mock;
    mockUseAppDispatch = jest.mocked(useAppDispatch) as jest.Mock;
    mockUseNavigate = jest.mocked(useNavigate) as jest.Mock;
    mockLoginMutation = jest.mocked(useLoginMutation) as jest.Mock;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should render signin form input elements", () => {
    mockLoginMutation.mockImplementation(() => {
      const login = jest.fn(() => ({
        unwrap: jest.fn(() =>
          Promise.resolve({
            refreshToken: "refreshToken",
            accessToken: "accessToken",
          })
        ),
      }));
      const error = undefined;
      const isLoading = true;
      return [login, { error, isLoading }];
    });
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
    expect(submitButton).toBeInTheDocument();
  });

  it("should redirect to dashboard page on successful signin with mocks", () => {
    const unwrap = jest.fn(() =>
      Promise.resolve({
        refreshToken: "refreshToken",
        accessToken: "accessToken",
      })
    );
    const login = jest.fn(() => ({
      unwrap,
    }));
    mockLoginMutation.mockImplementation(() => {
      const error = undefined;
      const isLoading = false;
      const state = { error, isLoading };
      return [login, state];
    });

    const dispatch = jest.fn();
    const navigate = jest.fn();
    jest.mocked(useAppDispatch).mockReturnValue(dispatch);
    jest.mocked(useNavigate).mockReturnValue(navigate);

    const form = render(
      <MemoryRouter initialEntries={["/signin"]}>
        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/signin" element={<SignInForm />} />
        </Routes>
      </MemoryRouter>
    );

    const emailInput = form.getByPlaceholderText(/Email Address/i);
    const passwordInput = form.getByPlaceholderText(/Password/i);
    const submitButton = form.getAllByText(/Sign In/i)[1];

    act(() => {
      fireEvent.change(emailInput, { target: { value: "test@test10.com" } });
      fireEvent.change(passwordInput, { target: { value: "test123" } });

      fireEvent.click(submitButton);
    });

    expect(mockLoginMutation).toHaveBeenCalled();
    expect(login).toHaveBeenCalled();
    waitFor(() => {
      expect(unwrap).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalled();
      expect(mockSetCredentials).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalled();
      const signinPage = form.getByText(/Dashboard/i);
      expect(signinPage).toBeInTheDocument();
    });
  });

  it("should redirect to dashboard page on successful signin", () => {
    jest.restoreAllMocks();

    const form = render(
      <MemoryRouter initialEntries={["/signin"]}>
        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/signin" element={<SignInForm />} />
        </Routes>
      </MemoryRouter>
    );

    const emailInput = form.getByPlaceholderText(/Email Address/i);
    const passwordInput = form.getByPlaceholderText(/Password/i);
    const submitButton = form.getAllByText(/Sign In/i)[1];

    act(() => {
      fireEvent.change(emailInput, { target: { value: "test@test10.com" } });
      fireEvent.change(passwordInput, { target: { value: "test123" } });

      fireEvent.click(submitButton);
    });

    waitFor(() => {
      const signinPage = form.getByText(/Dashboard/i);
      expect(signinPage).toBeInTheDocument();
    });
  });

  it("should fail to signin and remove refresh token", () => {
    const unwrap = jest.fn(() =>
      Promise.resolve({
        refreshToken: "refreshToken",
        accessToken: "accessToken",
      })
    );
    const login = jest.fn(() => ({
      unwrap,
    }));
    mockLoginMutation.mockImplementation(() => {
      const error = "ERROR";
      const isLoading = false;
      const state = { error, isLoading };
      return [login, state];
    });

    const dispatch = jest.fn();
    const navigate = jest.fn();
    jest.mocked(useAppDispatch).mockReturnValue(dispatch);
    jest.mocked(useNavigate).mockReturnValue(navigate);

    const form = render(
      <MemoryRouter initialEntries={["/signin"]}>
        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/signin" element={<SignInForm />} />
        </Routes>
      </MemoryRouter>
    );

    const emailInput = form.getByPlaceholderText(/Email Address/i);
    const passwordInput = form.getByPlaceholderText(/Password/i);
    const submitButton = form.getAllByText(/Sign In/i)[1];

    act(() => {
      fireEvent.change(emailInput, { target: { value: "test@test10.com" } });
      fireEvent.change(passwordInput, { target: { value: "test123" } });

      fireEvent.click(submitButton);
    });

    expect(mockLoginMutation).toHaveBeenCalled();
    expect(login).toHaveBeenCalled();
    expect(unwrap).not.toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
    const signinPage = form.queryByText(/Dashboard/i);
    expect(signinPage).not.toBeInTheDocument();
  });
});
