import { signin } from "../auth/operations";
import {
  getUserInfo,
  updateUserAvatar,
  updateUserDailyNorm,
  updateUserEmail,
  updateUserInfo,
} from "./operations";
import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      name: "",
      email: "",
      gender: "",
      dailyNorm: 0,
      avatar: null,
    },
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      //отримання інформації користувача
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Зберігаємо інформацію користувача в state.user
        state.user = action.payload.data; // Беремо дані з payload.data
        console.log("Отримані дані користувача:", state.user); // Додайте лог для перевірки
    })

      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //оновлення інформації користувача
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state.user) {
          state.user = { ...state.user, ...action.payload }; // Оновлюємо дані користувача
        }
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //оновлення аватарки користувача
      .addCase(updateUserAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state.user) {
          state.user.avatar = action.payload.avatar;
        }
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //оновлення пошти користувача
      .addCase(updateUserEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state.user) {
          state.user.email = action.payload.email;
        }
      })
      .addCase(updateUserEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //оновлення денної норми користувача
      .addCase(updateUserDailyNorm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDailyNorm.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log("Отримане action.payload:", action.payload); // Лог для перевірки
        state.user.dailyNorm = action.payload.data.user.dailyNorm; // Зберігаємо dailyNorm
        console.log("Збережений dailyNorm:", state.user.dailyNorm);
      })
      .addCase(updateUserDailyNorm.rejected, (state, action) => {
        console.error("Помилка при оновленні dailyNorm:", action.error);
        state.loading = false;
        state.error = action.payload;
      })
      //отримання юзера після авторизації
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
        state.loading = false;
      });
  },
});

export const userReducer = userSlice.reducer;
