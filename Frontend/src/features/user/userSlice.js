import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  searchUsersAPI,
  getProfileAPI,
} from "./userAPI";

export const searchUsers =
createAsyncThunk(
  "users/search",
  async (search) => {
    return await searchUsersAPI(search);
  }
);

export const getProfile =
createAsyncThunk(
  "users/profile",
  async () => {
    return await getProfileAPI();
  }
);

const userSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    profile: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        searchUsers.fulfilled,
        (state, action) => {
          state.users =
          action.payload.users;
        }
      )

      .addCase(
        getProfile.fulfilled,
        (state, action) => {
          state.profile =
          action.payload.user;
        }
      );
  },
});

export default userSlice.reducer;