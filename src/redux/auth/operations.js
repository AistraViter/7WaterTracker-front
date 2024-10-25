import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://sevenwatertracker-back-1.onrender.com";

const setAuthHeader = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
    };

export const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", credentials);
      setAuthHeader(response.data.data.accessToken);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.info("Conflict error (409):", error.response.data.data.message); 
        return thunkAPI.rejectWithValue({
          message: error.response.data.data.message,
          ignoreError: true,
        });
      } else {
        console.error("Registration failed:", error.message); 
        return thunkAPI.rejectWithValue(
          "Registration failed. Please try again."
        );
      }
    }
  }
);

export const signin = createAsyncThunk(
    'auth/signin',
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.post("/auth/login", credentials);
            setAuthHeader(response.data.data.accessToken)
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
  )

  export const refresh = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
      try {
        const response = await axios.post("/auth/refresh");
        setAuthHeader(response.data.data.accessToken); 
        return response.data.data; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  

  export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await axios.post("/auth/logout");
            clearAuthHeader()
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
  )

