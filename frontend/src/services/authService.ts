import { SignUpRequest, TokenResponse, UserCredentials } from "../models/Auth";
import { User } from "../models/User";
import APIService from "./apiService";

export const AuthService = APIService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TokenResponse, UserCredentials>({
      query: (credentials) => ({
        url: "auth/token/",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<User, SignUpRequest>({
      query: (accountDetails) => ({
        url: "auth/register/",
        method: "POST",
        body: accountDetails,
      }),
    }),
  }),
});



export const { useLoginMutation, useSignupMutation } = AuthService;
