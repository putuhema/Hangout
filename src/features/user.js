import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import UserApi from "./../api/user"

export const fetchUser = createAsyncThunk("user/fetchUserStatus", async () => {
  const response = await UserApi.fetchUser()
  return response.data
})

const initialState = {
  userList: [],
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userList = action.payload
    })
  },
})

export default userSlice.reducer
