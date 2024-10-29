import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";

export const getWaterNotes = createAsyncThunk(
  "water/getWaterNotes",
  async (_, thunkAPI) => {
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
  async ({ _id, waterVolume, date, time, }, thunkAPI) => {
    try {
      const data = { waterVolume, date, time, };
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
