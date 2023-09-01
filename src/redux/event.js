import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import repositories from "@/repositories/repositories";

export const getAllEvent = createAsyncThunk("product/fetchProductsStatus", async () => {
  const response = await repositories.getAPI("event");
  return response.data;
});

export const getOneEvent = createAsyncThunk("product/fetchProductsStatus", async (id) => {
  const response = await repositories.getAPI(`event/${id}`);
  return response.data;
});

const initialState = {
  events: [],
  loading: "idle" | "pending" | "success" | "failed",
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllEvent.fulfilled, (state, action) => {
      state.events = action.payload;
    });
  },
});

export default eventSlice.reducer;
