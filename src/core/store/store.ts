import { configureStore } from "@reduxjs/toolkit";
import { api } from "@core/services/api.ts";
// import cartReducer from "./slices/cartSlices";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
