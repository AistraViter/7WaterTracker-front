import { createSlice } from "@reduxjs/toolkit";
import { signup, signin, logout, refresh } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      token: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false, 
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.user.token = action.payload.accessToken; // Токен в user
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.user.token = action.payload.accessToken; // Токен в user
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { token: null, email: null }; // Очистка токена та email
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true; // Set refreshing state to true
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload.user; // Update user data
        state.user.token = action.payload.accessToken; // Оновлення токена
        state.isRefreshing = false; // Reset refreshing state
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isRefreshing = false; // Reset refreshing state
        state.error = action.payload; // Set the error if refresh fails
      });
  },
});

export const authReducer = authSlice.reducer;


