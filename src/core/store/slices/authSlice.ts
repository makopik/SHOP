import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  role: "admin" | "user" | null;
  isAuth: boolean;
};

const initialState: AuthState = {
  role: null,
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
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
