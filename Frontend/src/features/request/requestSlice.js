import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  sendRequestAPI,
  getRequestsAPI,
  acceptRequestAPI,
  rejectRequestAPI,
} from "./requestAPI";

export const sendRequest =
createAsyncThunk(
  "request/send",
  async (receiverId) => {
    return await sendRequestAPI(receiverId);
  }
);

export const getRequests =
createAsyncThunk(
  "request/get",
  async () => {
    return await getRequestsAPI();
  }
);

export const acceptRequest =
createAsyncThunk(
  "request/accept",
  async (id) => {
    return await acceptRequestAPI(id);
  }
);

export const rejectRequest =
createAsyncThunk(
  "request/reject",
  async (id) => {
    return await rejectRequestAPI(id);
  }
);

const requestSlice = createSlice({
  name: "request",

  initialState: {
    requests: [],
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        getRequests.fulfilled,
        (state, action) => {
          state.requests =
          action.payload.requests;
        }
      )

      .addCase(
        acceptRequest.fulfilled,
        (state, action) => {

          state.requests =
          state.requests.filter(
            (req)=>
              req._id !==
              action.payload.request._id
          );
        }
      )

      .addCase(
        rejectRequest.fulfilled,
        (state, action) => {

          state.requests =
          state.requests.filter(
            (req)=>
              req._id !==
              action.payload.request._id
          );
        }
      );
  },
});

export default requestSlice.reducer;