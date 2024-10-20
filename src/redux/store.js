import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { userReducer } from "./user/slice";
import { waterReducer } from "./water/slice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
  }
export const store = configureStore({
    reducer: {
        auth: persistReducer(authPersistConfig, authReducer),
        user: persistReducer(userReducer),
        water: persistReducer(waterReducer)
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        }),
});

export const persistor = persistStore(store)
