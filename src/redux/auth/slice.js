import { createSlice } from "@reduxjs/toolkit";
import { signup, signin, logout,refresh } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
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
        state.isRefreshing = true;
        state.loading = true;
        state.error = null;
          })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.loading = false;
        state.isRefreshing = false;
          })
      .addCase(signup.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.isRefreshing = true;
        state.loading = true;
        state.error = null;
          })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.data.accessToken;
        console.log("Токен збережений у стані:", state.token);

        state.isLoggedIn = true;
        state.loading = false;
        state.isRefreshing = false;
          })


      .addCase(signin.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.isRefreshing = true;
        state.loading = true;
        state.error = null;
          })
      .addCase(logout.fulfilled, (state) => {
        state.user = { email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.isRefreshing = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isRefreshing = true;
        state.loading = false; 
        state.error = null;
            })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true; 
        state.loading = true;
        state.error = null;
          })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload.user; 
        state.isLoggedIn = true;
        state.loading = false;
        state.isRefreshing = false;
    
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isRefreshing = false; 
        state.error = action.payload; 
      });
  },
});

export const authReducer = authSlice.reducer;