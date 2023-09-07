import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global";
import eventReducer from "./event";
import reviewReducer from "./review";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    event: eventReducer,
    review: reviewReducer,
    user: userReducer,
  },
});
