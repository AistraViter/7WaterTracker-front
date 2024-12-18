//// Store
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";
import { userReducer } from "./user/slice";
import { waterReducer } from "./water/slice";
import { modalReducer } from "./modal/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const userPersistConfig = {
  key: "user",
  storage,
};

const waterPersistConfig = {
  key: "water",
  storage,
};

const modalPersistConfig = {
  key: "modal",
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    user: persistReducer(userPersistConfig, userReducer),
    water: persistReducer(waterPersistConfig, waterReducer),
    modal: persistReducer(modalPersistConfig, modalReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
