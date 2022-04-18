import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { authedState, renderWithProviders, testUser } from "./test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UserListView from "../views/users/UserListView";

import ShallowRenderer from "react-test-renderer/shallow";
import { useFetchAllUsersQuery } from "../services/userService";
import Loadscreen from "../components/Loadscreen";
import MainLayoutWithToolbar from "../layout/MainLayoutWithToolbar";
import { Alert } from "react-bootstrap";
import UserList from "../components/users/UserList";

jest.mock("../services/userService", () => {
  return {
    useFetchAllUsersQuery: jest.fn(),
  };
});

describe("<UserListView />", () => {
  let mockQuery: jest.Mock;
  const renderer = ShallowRenderer.createRenderer();

  beforeEach(() => {
    mockQuery = jest.mocked(useFetchAllUsersQuery) as jest.Mock;
  });

  it("should render loadscreen", () => {
    mockQuery.mockImplementationOnce(() => {
      const data = undefined;
      const error = undefined;
      const isLoading = true;
      return { data, error, isLoading };
    });

    renderer.render(<UserListView />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe(Loadscreen);
    //expect(result.props.children).toEqual([<Loadscreen />]);
  });

  it("should render error", () => {
    mockQuery.mockImplementationOnce(() => {
      const data = undefined;
      const error = "ERROR";
      const isLoading = false;
      return { data, error, isLoading };
    });

    renderer.render(<UserListView />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe(MainLayoutWithToolbar);
    expect(result.props.children).toEqual(
      <>
        <Alert>"ERROR"</Alert>
        <UserList users={[]} />
      </>
    );
  });

  it("should render user list", () => {
    const users = [testUser];
    mockQuery.mockImplementationOnce(() => {
      const data = users;
      const error = undefined;
      const isLoading = false;
      return { data, error, isLoading };
    });

    renderer.render(<UserListView />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe(MainLayoutWithToolbar);
    expect(result.props.children.props.children).toEqual([
      undefined,
      <UserList users={users} />,
    ]);
  });
});
