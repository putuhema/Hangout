import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./event";
import globalReducer from "./global";

export const store = configureStore({
  reducer: {
    event: eventReducer,
    global: globalReducer,
  },
});
