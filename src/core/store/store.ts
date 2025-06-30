import { configureStore } from "@reduxjs/toolkit";
import { api } from "@core/services/api.ts";
import cartReducer from "./slices/cartSlices";
import authReducer from "./slices/authSlice";
import notificationsReducer from "./slices/notificationsSlice";
import productsMetadataReducer from "./slices/productMetadataSlice";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    cart: cartReducer,
    notifications: notificationsReducer,
    productMetadata: productsMetadataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
