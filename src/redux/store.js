import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"; 
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Combine the slices into a root reducer
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
});

// Create a persisted reducer using the persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
