import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@core/store/store.ts";

type Role = "admin" | "user";

type AuthState = {
  role: Role | null;
  isAuth: boolean;
};

const initialState: AuthState = {
  role: "user",
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<"admin" | "user">) {
      state.role = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.role = null;
      state.isAuth = false;
    },
    setRole(state, action: PayloadAction<"admin" | "user">) {
      state.role = action.payload;
    },
  },
});
export const selectIsAdmin = (state: RootState) => state.auth.role === "admin";
export const { login, logout, setRole } = authSlice.actions;
export default authSlice.reducer;
