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

export const getWaterNotes = createAsyncThunk(
  "water/getWaterNotes",
  async (_, thunkAPI) => {
    configureAuthHeader(thunkAPI); // Налаштовуємо заголовок авторизації
    try {
      const response = await axios.get("/water/note", {});
      return response.data.data; // приходить в об'єкт data: {}
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get water notes"
      );
    }
  }
);

export const postWaterNote = createAsyncThunk(
  "water/postWaterNote",
  async ({ date, waterVolume, time }, thunkAPI) => {
    configureAuthHeader(thunkAPI); // Налаштовуємо заголовок авторизації

    try {
      const response = await axios.post("/water/note", {
        date,
        waterVolume,
        time,
      });
      return response.data.data; // приходить в об'єкт data: {}
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add a water note"
      );
    }
  }
);

export const updateWaterNote = createAsyncThunk(
  "water/updateWaterNote",
  async ({ _id, waterVolume, date, time }, thunkAPI) => {
    configureAuthHeader(thunkAPI); // Налаштовуємо заголовок авторизації

    try {
      const data = { waterVolume, date, time };
      const response = await axios.patch(`/water/note/${_id}`, data);
      return response.data.data; // Припускаємо, що дані приходять в об'єкті data: {}
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update a water note"
      );
    }
  }
);

export const deleteWaterNote = createAsyncThunk(
  "water/deleteWaterNote",
  async (id, thunkAPI) => {
    configureAuthHeader(thunkAPI); // Налаштовуємо заголовок авторизації

    try {
      const response = await axios.delete(`/water/note/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete a water note"
      );
    }
  }
);

export const getWaterToday = createAsyncThunk(
  "water/getWaterToday",
  async (_, thunkAPI) => {
    configureAuthHeader(thunkAPI); // Налаштовуємо заголовок авторизації

    try {
      const response = await axios.get("/water/today", {});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get a water note for today"
      );
    }
  }
);

export const getWaterMonth = createAsyncThunk(
  "water/getWaterMonth",
  async ({ month, year }, thunkAPI) => {
    configureAuthHeader(thunkAPI); // Налаштовуємо заголовок авторизації

    try {
      const response = await axios.get(`/water/month`, {
        params: { month, year },
      });
      return response.data.data; // приходить в об'єкт data: {}
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to get a water note for month"
      );
    }
  }
);
