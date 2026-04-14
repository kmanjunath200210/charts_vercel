// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import forecastReducer from "../features/forecast/forecastSlice";

export const store = configureStore({
  reducer: {
    forecast: forecastReducer,
  },
});

export default store;