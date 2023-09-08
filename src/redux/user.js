import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import repositories from "@/repositories/repositories";

export const getAllUser = createAsyncThunk("users/fetcheventsStatus", async () => {
  const response = await repositories.getAPI("users");
  return response.data;
});

export const getOneUser = createAsyncThunk("user/fetcheventsStatus", async (id) => {
  const response = await repositories.getAPI(`users/${id}`);
  return response.data;
});

const initialState = {
  users: [],
  user: {},
  loading: "idle" | "pending" | "success" | "failed",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getOneUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
