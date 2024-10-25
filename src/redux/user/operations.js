import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getUserInfo = createAsyncThunk(
    "user/getUser",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('/user/info');
        return response.data.data; // приходить в об'єкт data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to get user');
      }
    }
  );

  export const updateUserInfo = createAsyncThunk(
    'user/updateUser',
    async (newInfo, thunkAPI) => {
      try {
        const response = await axios.put('/user/info', newInfo);
        return response.data.data; // приходить в об'єкт data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update user');
      }
    }
  );

  export const updateUserAvatar = createAsyncThunk(
    'user/updateAvatar',
    async (newAvatar, thunkAPI) => {
      try {
        const response = await axios.patch('/user/avatar', newAvatar);
        return response.data; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update avatar');
      }
    }
  );

  export const updateUserEmail = createAsyncThunk(
    'user/updateEmail',
    async (newEmail, thunkAPI) => {
      try {
        const response = await axios.post('/user/email', newEmail);
        return response.data.data; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update email');
      }
    }
  );

  export const updateUserDailyNorm = createAsyncThunk(
    'user/updateDailyNorm',
    async (dailyNorm, thunkAPI) => {
      try {
        const response = await axios.put('/user/daily-norm', dailyNorm);
        return response.data; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update daily norm');
      }
    }
  );
