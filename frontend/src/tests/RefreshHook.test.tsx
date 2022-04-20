import React from "react";

import { useRefreshToken } from "../hooks/refresh";
import { act } from "react-dom/test-utils";
import { renderHook, waitFor } from "@testing-library/react";
import { testUser } from "./test-utils";
import { useAppDispatch } from "../hooks/store";
import { setCredentials } from "../features/auth/authSlice";

const result = {
  accessToken: "testAccessToken",
  user: testUser,
};

jest.mock("../hooks/store", () => {
  return {
    useAppDispatch: jest.fn(),
  };
});

jest.mock("../features/auth/authSlice", () => {
  return {
    setCredentials: jest.fn(),
  };
});

describe("Refresh Hook Tests", () => {
  let mockSetCredentials: jest.Mock;
  let mockUseAppDispatch: jest.Mock;

  beforeEach(() => {
    localStorage.removeItem("refreshToken");
    jest.spyOn(global, "fetch");
    mockSetCredentials = jest.mocked(setCredentials) as jest.Mock;
    mockUseAppDispatch = jest.mocked(useAppDispatch) as jest.Mock;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should successfully request refresh access token on render", async () => {
    localStorage.setItem("refreshToken", "testRefreshToken");
    const dispatch = jest.fn();
    jest.mocked(useAppDispatch).mockReturnValueOnce(dispatch);

    jest.mocked(fetch).mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(result),
    } as Response);

    act(() => {
      const { rerender } = renderHook(useRefreshToken);
      return rerender();
    });

    waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/auth/refresh/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: "testRefreshToken" }),
        }
      );

      expect(dispatch).toHaveBeenCalled();
      expect(setCredentials).toHaveBeenCalledWith({
        user: result.user,
        token: result.accessToken,
      });
    });

    localStorage.removeItem("refreshToken");
  });

  it("should fail to request refresh access token on render,no token present", async () => {
    const dispatch = jest.fn();
    jest.mocked(useAppDispatch).mockReturnValueOnce(dispatch);

    act(() => {
      const { rerender } = renderHook(useRefreshToken);
      return rerender();
    });

    waitFor(() => {
      expect(fetch).not.toHaveBeenCalled();
      expect(dispatch).not.toHaveBeenCalled();
      expect(setCredentials).not.toHaveBeenCalled();
    });
  });

  it("should successfully request refresh access token on render, invalid token", async () => {
    localStorage.setItem("refreshToken", "testRefreshToken");

    const dispatch = jest.fn();
    jest.mocked(useAppDispatch).mockReturnValueOnce(dispatch);

    jest.mocked(fetch).mockResolvedValue({
      status: 401,
      json: () => Promise.resolve(result),
    } as Response);

    act(() => {
      const { rerender } = renderHook(useRefreshToken);
      return rerender();
    });

    waitFor(() => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/auth/refresh/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: "testRefreshToken" }),
        }
      );

      expect(dispatch).not.toHaveBeenCalled();
      expect(setCredentials).not.toHaveBeenCalled();
    });

    localStorage.removeItem("refreshToken");
  });
});
