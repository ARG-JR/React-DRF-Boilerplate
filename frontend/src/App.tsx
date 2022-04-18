import React from "react";
import { Route, Routes } from "react-router-dom";
import Protect from "./components/auth/Protect";
import { Spinner } from "react-bootstrap";
import SignUpView from "./views/auth/SignUpView";
import SignInView from "./views/auth/SignInView";
import DashboardView from "./views/DashboardView";
import UserListView from "./views/users/UserListView";
import EditUserView from "./views/users/EditUserView";
import UserDetailView from "./views/users/UserDetailView";
import { useRefreshToken } from "./hooks/refresh";

function App() {
  const loading = useRefreshToken()

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
