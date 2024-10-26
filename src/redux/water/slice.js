import { createSlice } from "@reduxjs/toolkit";
import { 
  getWaterNotes, 
  postWaterNote, 
  updateWaterNote, 
  deleteWaterNote,
  getWaterToday,
  getWaterMonth
 } from "./operations.js";

const waterSlice = createSlice({
    name: 'water',
    initialState: {
        notes: [], // для зберігання даних про воду
        monthlyData: [], // для зберігання даних за місяць
        percentage: 0, // для зберігання проценту спожитої води за сьогодні
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
      builder
      // Обробка запиту на отримання записів про воду
      .addCase(getWaterNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWaterNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.notes = action.payload?.data || []; // Перевірка наявності `data`
      })
      .addCase(getWaterNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      // Обробка запиту на додавання записів про воду
      .addCase(postWaterNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postWaterNote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.notes.push(action.payload?.data || {}); // Перевірка наявності `data`
      })
      .addCase(postWaterNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      // Обробка запиту на оновлення записів про воду
      .addCase(updateWaterNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWaterNote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedNote = action.payload?.data || {}; // Перевірка наявності `data`
        const index = state.notes.findIndex(note => note._id === updatedNote._id);
        if (index !== -1) {
          state.notes[index] = updatedNote;
        }
      })
      .addCase(updateWaterNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Обробка запиту на видалення записів про воду
      .addCase(deleteWaterNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWaterNote.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.notes = state.notes.filter(note => note._id !== action.payload);
      })
      .addCase(deleteWaterNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Обробка запиту на отримання записів про воду за сьогодні
      .addCase(getWaterToday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWaterToday.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.notes = action.payload?.data?.notes || []; // Перевірка наявності `data.notes`
        state.percentage = action.payload?.data?.percentage || 0; // Перевірка наявності `data.percentage`
      })
      .addCase(getWaterToday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Обробка запиту на отримання записів про воду за місяць
      .addCase(getWaterMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWaterMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.monthlyData = action.payload?.data || []; // Перевірка наявності `data`
      })
      .addCase(getWaterMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
  });

export const waterReducer = waterSlice.reducer;
