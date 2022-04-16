import { configureStore } from "@reduxjs/toolkit";
import APIService from "./services/apiService";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    [APIService.reducerPath]: APIService.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(APIService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
