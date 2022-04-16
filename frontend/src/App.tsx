import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SignUpView from "./views/auth/SignUpView";
import SignInView from "./views/auth/SignInView";
import Protect from "./components/auth/Protect";
import { useAppDispatch, useTypedSelector } from "./hooks/store";
import { Spinner } from "react-bootstrap";
import DashboardView from "./views/DashboardView";
import UserListView from "./views/users/UserListView";
import EditUserView from "./views/users/EditUserView";
import UserDetailView from "./views/users/UserDetailView";
import { setCredentials } from "./features/auth/authSlice";
import { RefreshResponse } from "./models/Auth";

function App() {
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
          dispatch(
            setCredentials({ user: data.user, token: data.accessToken })
          );
        }
        
      }
      setLoading(false);
    };
    refresh();
  }, [dispatch]);

  if (loading) return (
    <div className="h-100 d-flex justify-content-center align-items-center bg-dark">
      <Spinner animation="border" />
    </div>
  );

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Protect>
              <DashboardView />
            </Protect>
          }
        />
        <Route
          path="/signup"
          element={
            <Protect inverse>
              <SignUpView />
            </Protect>
          }
        />
        <Route
          path="/signin"
          element={
            <Protect inverse>
              <SignInView />
            </Protect>
          }
        />
        <Route
          path="/users"
          element={
            <Protect>
              <UserListView />
            </Protect>
          }
        />
        <Route
          path="/users/:id"
          element={
            <Protect>
              <UserDetailView />
            </Protect>
          }
        />
        <Route
          path="/users/:id/edit"
          element={
            <Protect>
              <EditUserView />
            </Protect>
          }
        />
      </Routes>
    </>
  );
}

export default App;
