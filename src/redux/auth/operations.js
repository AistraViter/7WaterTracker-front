//// Operations auth
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://sevenwatertracker-back-1.onrender.com";
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
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
  "auth/signin",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", credentials);
      setAuthHeader(response.data.data.accessToken); // Додайте налаштування заголовка
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    const response = await axios.post("/auth/refresh");
    setAuthHeader(response.data.accessToken);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  
  const token = thunkAPI.getState().auth.token; // Отримуємо токен з Redux стану
  console.log("Токен перед логаутом:", token); // Лог токена перед запитом

  if (!token) {
    console.log("Токен не знайдено перед логаутом.");
    return thunkAPI.rejectWithValue("Токен не знайдено.");
  }

  setAuthHeader(token); // Встановлюємо заголовок авторизації

  try {
    console.log("Логаут запит надсилається...");
    await axios.post("/auth/logout", {}, {
      headers: {
        Authorization: `Bearer ${token}` // Передача токена безпосередньо в запиті
      }
    });
    
    clearAuthHeader(); // Очищення заголовка авторизації після логауту
    return true;
  } catch (error) {
    console.log(`Помилка логауту: ${error.message}`);
    return thunkAPI.rejectWithValue(error.message); // Обробка помилки
  }
});

// Функція для очищення заголовка
const clearAuthHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};


