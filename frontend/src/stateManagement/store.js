import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { usersApiSlice } from "../screens/users/usersApiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // this is required for the api middleware
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,

    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // this is required for the api middleware
  devTools: true,
});