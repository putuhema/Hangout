import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./slice/eventSlice";
import reviewSlice from "./slice/review.slice";

export const store = configureStore({
  reducer: {
    events: eventSlice,
    review: reviewSlice,
  },
});
