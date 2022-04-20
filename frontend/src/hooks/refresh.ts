import { useEffect, useState } from "react";
import { setCredentials } from "../features/auth/authSlice";
import { RefreshResponse } from "../models/Auth";
import { useAppDispatch } from "./store";

export const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      const token = localStorage.getItem("refreshToken");
      if (token) {
        const refreshRequest = {
          refresh: token,
        };
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/refresh/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(refreshRequest),
          }
        );

        if (response.status === 200) {
          const data: RefreshResponse = await response.json();
          dispatch(setCredentials({ user: data.user, token: data.accessToken }));
        }
      }
    setLoading(false);
  };
    refresh();
  }, [refresh]);

  return loading;
};
