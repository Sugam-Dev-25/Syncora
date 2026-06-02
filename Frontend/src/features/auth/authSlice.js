import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { registerAPI, loginAPI, getMeAPI, logoutAPI } from "./authAPI";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData) => {
    return await registerAPI(formData);
  },
);

export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  return await loginAPI(formData);
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  return await logoutAPI();
});

export const getMe = createAsyncThunk("auth/me", async () => {
  return await getMeAPI();
});

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    loading: true,
  },

  extraReducers: (builder) => {
    builder

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })

      // GET ME PENDING
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })

      // GET ME SUCCESS
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;
      })

      // GET ME FAILED
      .addCase(getMe.rejected, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
