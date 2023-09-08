import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rating: 0,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setRating: (state, action) => {
      state.rating = action.payload;
    },
  },
});

export const { setRating } = reviewSlice.actions;
export const getRating = (state) => state.review.rating;
export default reviewSlice.reducer;
