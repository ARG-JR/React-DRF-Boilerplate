import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../features/auth/authSlice";
import { RefreshResponse } from "../models/Auth";
import { RootState } from "../store";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_API_URL}/`,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).auth.token;

    if (token && endpoint !== "refresh") {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {

  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh/",
        method: "POST",
        body: { refresh: refreshToken ?? "" },
      },
      { ...api, endpoint: "refresh" },
      extraOptions
    );

    if (refreshResult.data) {
    const response: RefreshResponse = refreshResult.data as RefreshResponse
      api.dispatch(
        setCredentials({
          user: response.user,
          token: response.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
