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
    'auth/signup',
    async (credentials, thunkAPI) => {
        try {
            const response = await axios.post('/auth/register', credentials);
            setAuthHeader(response.data.token)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
  )

  // Авторизация пользователя
export const signin = createAsyncThunk(
  'auth/signin',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      // Обработка ошибки 401 (Unauthorized)
      if (error.response && error.response.status === 401) {
        return thunkAPI.rejectWithValue("Invalid email or password.");
      }
      return thunkAPI.rejectWithValue(error.message || "An error has occurred.");
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

