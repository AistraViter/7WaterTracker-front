


import { createSlice } from "@reduxjs/toolkit";
import { getWaterNotes, postWaterNote, updateWaterNote, deleteWaterNote } from "./operations.js";
const waterSlice = createSlice({
    name: 'water',
    initialState: {
        waterNotes: [],
        loading: false,
        error: null
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
        state.notes = action.payload;
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
        state.notes.push(action.payload); 
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
        const index = state.waterNotes.findIndex(note => note._id === action.payload._id);
        if (index !== -1) {
          state.waterNotes[index] = action.payload;
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
        state.waterNotes = state.waterNotes.filter(note => note._id !== action.payload);
      })
      .addCase(deleteWaterNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    },
  });
  
  export const waterReducer = waterSlice.reducer;