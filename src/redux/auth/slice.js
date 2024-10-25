import { createSlice } from "@reduxjs/toolkit";
import { signup, signin, refresh, logout } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      password: null,
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
        console.log(action.payload); 
        state.user = action.payload.user;
        state.token = action.payload.accessToken; 
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
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.error = null;
        state.loading = false;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
      })
      .addCase(refresh.pending, (state) => {
        state.loading = true;
        state.isLoggedIn = false;
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
        state.loading = false;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { password: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
})

export const authReducer = authSlice.reducer;


