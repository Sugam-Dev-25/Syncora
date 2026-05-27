import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  registerAPI,
  loginAPI,
} from "./authAPI";

export const registerUser =
createAsyncThunk(
  "auth/register",
  async (formData) => {

    return await registerAPI(
      formData
    );

  }
);

export const loginUser =
createAsyncThunk(
  "auth/login",
  async (formData) => {

    return await loginAPI(
      formData
    );

  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {

    user:
      localStorage.getItem("user")
        ? JSON.parse(
            localStorage.getItem("user")
          )
        : null,

    loading: false,
  },

  reducers: {

    logout: (state) => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      state.user = null;

    },

  },

  extraReducers: (builder) => {

    builder

      .addCase(
        registerUser.fulfilled,
        (state, action) => {

          state.user =
          action.payload;

          localStorage.setItem(
            "token",
            action.payload.token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              action.payload
            )
          );

        }
      )

      .addCase(
        loginUser.fulfilled,
        (state, action) => {

          state.user =
          action.payload;

          localStorage.setItem(
            "token",
            action.payload.token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(
              action.payload
            )
          );

        }
      );

  },

});

export const {
  logout
} = authSlice.actions;

export default authSlice.reducer;