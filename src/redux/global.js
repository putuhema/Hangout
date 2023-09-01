import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    count: 0,
    rating: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, setRating } = globalSlice.actions;
export default globalSlice.reducer;
