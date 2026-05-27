import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getConversationsAPI,
  getMessagesAPI,
  sendMessageAPI,
} from "./chatAPI";

export const getConversations =
createAsyncThunk(
  "chat/conversations",
  async () => {
    return await getConversationsAPI();
  }
);

export const getMessages =
createAsyncThunk(
  "chat/messages",
  async (conversationId) => {
    return await getMessagesAPI(
      conversationId
    );
  }
);

export const sendMessage =
createAsyncThunk(
  "chat/sendMessage",
  async (formData) => {
    return await sendMessageAPI(formData);
  }
);

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    conversations: [],
    messages: [],
    selectedUser: null,
  },

  reducers: {

    setSelectedUser:
    (state, action) => {

      state.selectedUser =
      action.payload;
    },

    addMessage:
    (state, action) => {

      state.messages.push(
        action.payload
      );
    },

  },

  extraReducers: (builder) => {

    builder

      .addCase(
        getConversations.fulfilled,
        (state, action) => {

          state.conversations =
          action.payload.users;
        }
      )

      .addCase(
        getMessages.fulfilled,
        (state, action) => {

          state.messages =
          action.payload.messages;
        }
      )

      .addCase(
        sendMessage.fulfilled,
        (state, action) => {

          state.messages.push(
            action.payload.message
          );
        }
      );
  },
});

export const {
  setSelectedUser,
  addMessage,
} = chatSlice.actions;

export default chatSlice.reducer;