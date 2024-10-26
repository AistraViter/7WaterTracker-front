import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://sevenwatertracker-back-1.onrender.com";

export const getWaterNotes = createAsyncThunk(
  "water/getWaterNotes",
  async (token, thunkAPI) => {
    // Очистка токена від зайвих лапок
    const cleanedToken = token ? token.replace(/"/g, "") : null;
    if (!cleanedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }
    // Встановлення заголовка
    axios.defaults.headers.common.Authorization = `Bearer ${cleanedToken}`;
    try {
      
      const response = await axios.get("/water/note", {
        headers: {
          Authorization: `Bearer ${cleanedToken}`,
        },
      });
      console.log("Response from backend:", response.data); // Діагностика

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
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/note/${id}`, data);
      return response.data.data; // приходить в об'єкт data: {}
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
  async (token, thunkAPI) => {
    // Очистка токена від зайвих лапок
    const cleanedToken = token ? token.replace(/"/g, "") : null;
    if (!cleanedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }
    // Встановлення заголовка
    axios.defaults.headers.common.Authorization = `Bearer ${cleanedToken}`;
    try {
      const response = await axios.get("/water/today", {
        headers: {
          Authorization: `Bearer ${cleanedToken}`,
        },
      });
      console.log("Response from backend:", response.data); // Діагностика
      return response.data.data;
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
