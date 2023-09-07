import { configureStore } from "@reduxjs/toolkit";
import eventSlice from "./slice/eventSlice";

export const store = configureStore({
    reducer: {
        events: eventSlice
    }
})