import { configureStore } from "@reduxjs/toolkit";
import { expensesSlice } from "./features/expenses/expensesSlice";
import { limitsSlice } from "./features/limits/limitsSlice";
import apiSlice from "./features/api/apiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      expense: expensesSlice.reducer,
      limit: limitsSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
