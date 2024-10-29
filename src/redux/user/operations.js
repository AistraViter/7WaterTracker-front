//// Operations user
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://sevenwatertracker-back-1.onrender.com";

// Функції для налаштування заголовків
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Загальна функція для отримання токена та налаштування заголовка
const configureAuthHeader = (thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.auth.token; // Отримуємо токен з authSlice
  if (token) {
    setAuthHeader(token); // Налаштовуємо заголовок з токеном
  }
};

export const getUserInfo = createAsyncThunk(
  "user/getUser",
  async (_, thunkAPI) => {
    configureAuthHeader(thunkAPI); // Налаштовуємо заголовок авторизації

    try {
      const response = await axios.get("/user/info");
      return response.data.data; // приходить в об'єкт data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get user"
      );
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateUser",
  async (newInfo, thunkAPI) => {
    configureAuthHeader(thunkAPI); // Налаштовуємо заголовок авторизації

    try {
      const response = await axios.put("/user/info", newInfo);
      return response.data.data; // приходить в об'єкт data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (newAvatar, thunkAPI) => {
    configureAuthHeader(thunkAPI); // Налаштовуємо заголовок авторизації

    try {
      const response = await axios.patch("/user/avatar", newAvatar);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update avatar"
      );
    }
  }
);

export const updateUserEmail = createAsyncThunk(
  "user/updateEmail",
  async (newEmail, thunkAPI) => {
    configureAuthHeader(thunkAPI); // Налаштовуємо заголовок авторизації

    try {
      const response = await axios.post("/user/email", newEmail);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update email"
      );
    }
  }
);

export const updateUserDailyNorm = createAsyncThunk(
  "user/updateDailyNorm",
  async (dailyNorm, thunkAPI) => {
    configureAuthHeader(thunkAPI); // Налаштовуємо заголовок авторизації

    try {
      const response = await axios.put("/user/daily-norm", dailyNorm);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update daily norm"
      );
    }
  }
);
