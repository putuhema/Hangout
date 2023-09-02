import repositories from "@/repositories/repositories";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllReview = createAsyncThunk("reviews", async () => {
  const response = await repositories.getAPI(`reviews`);
  return response.data;
});

export const getReviewEvent = createAsyncThunk("reviews", async (id) => {
  const response = await repositories.getAPI(`reviews/${id}?_expand=event`);
  return response.data;
});

const initialState = {
  reviews: [],
  loading: "idle" | "pending" | "success" | "failed",
};

export const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReviewEvent.fulfilled, (state, action) => {
      state.reviews = action.payload;
    });
  },
});

export default reviewSlice.reducer;
