import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { format } from "date-fns";

// Асинхронний екшн для отримання даних за місяць
export const fetchMonthlyData = createAsyncThunk(
  "water/fetchMonthlyData",
  async (_, { rejectWithValue }) => {
    try {
      const currentMonth = format(new Date(), "yyyy-MM"); // Формат: YYYY-MM
      const response = await axios.get(`/api/water?month=${currentMonth}`); // Ендпоінт для отримання даних за місяць
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const waterSlice = createSlice({
  name: "water",
  initialState: {
    monthlyData: [], // Збережемо дані за місяць тут
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMonthlyData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.monthlyData = action.payload;
      })
      .addCase(fetchMonthlyData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectMonthlyData = (state) => state.water.monthlyData;
export default waterSlice.reducer;
