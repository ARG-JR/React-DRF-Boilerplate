import { User } from "./User";

export interface UserCredentials {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshResponse {
  accessToken: string;
  user: User;
}

export interface SignUpRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
}
