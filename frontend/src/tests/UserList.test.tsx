import React from "react";
import UserList from "../components/users/UserList";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { testUser } from "./test-utils";
import { MemoryRouter, Routes, Route } from "react-router-dom";

describe("<SignUpForm />", () => {
  it("should render user list", () => {
    const form = render(
      <MemoryRouter initialEntries={["/users"]}>
        <Routes>
          <Route path="/users" element={<UserList users={[testUser]} />} />
          <Route path="/users/1" element={<div>User Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const noUsersMessage = form.queryByText(
      /Sorry, there aren't any users right now!/i
    );
    expect(noUsersMessage).toBeNull()
    
  });

  it("should not render user list", () => {
    const form = render(
      <MemoryRouter initialEntries={["/users"]}>
        <Routes>
          <Route path="/users" element={<UserList users={[]} />} />
          <Route path="/users/1" element={<div>User Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const noUsersMessage = form.queryByText(
      /Sorry, there aren't any users right now!/i
    );
    expect(noUsersMessage).toBeInTheDocument();
  });
});
