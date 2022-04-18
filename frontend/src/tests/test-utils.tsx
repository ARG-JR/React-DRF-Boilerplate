import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { setupStore } from "../store";
import type { AppStore, RootState } from "../store";
import type { PreloadedState } from "@reduxjs/toolkit";
import { User } from "../models/User";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store. For
// future dependencies, such as wanting to test with react-router, you can extend
// this interface to accept a path and route and use those in a <MemoryRouter />
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const testUser: User = {
  id: 1,
  last_login: undefined,
  is_superuser: false,
  email: "test@test.com",
  username: "test",
  first_name: "test",
  last_name: "testerson",
  created: "2022-04-16T21:57:40.294086-05:00",
  updated: "2022-04-16T21:57:40.294131-05:00",
  is_staff: false,
  is_active: true,
  groups: [],
  user_permissions: [],
};

export const authedState = {
  auth: {
    token: "asdf",
    user: testUser,
  },
};

export const authedStaffState = {
  auth: {
    token: "asdf",
    user: { ...testUser, is_staff: true },
  },
};

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export function mockFunction<T extends (...args: any[]) => any>(
  fn: T
): jest.MockedFunction<T> {
  return fn as jest.MockedFunction<T>;
}

export { renderWithProviders };
