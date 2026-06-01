import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getConversationsAPI, getMessagesAPI, sendMessageAPI } from "./chatAPI";

export const getConversations = createAsyncThunk(
  "chat/conversations",
  async () => {
    return await getConversationsAPI();
  },
);

export const getMessages = createAsyncThunk(
  "chat/messages",
  async (conversationId) => {
    return await getMessagesAPI(conversationId);
  },
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (formData) => {
    return await sendMessageAPI(formData);
  },
);

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    conversations: [],
    messages: [],
    selectedUser: null,
    onlineUsers: [],
    unreadMessages: {},
  },

  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      delete state.unreadMessages[action.payload._id];
    },

    addMessage: (state, action) => {
      const message = action.payload;

      state.messages.push(message);

      const senderId =
        typeof message.sender === "object"
          ? message.sender._id
          : message.sender;

      const conversation = state.conversations.find(
        (user) => user._id === senderId,
      );

      if (conversation) {
        conversation.lastMessage = message.text || "Sent a file";

        // MOVE TO TOP

        const filtered = state.conversations.filter(
          (user) => user._id !== senderId,
        );

        state.conversations = [conversation, ...filtered];
      }
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    setUnreadMessage: (state, action) => {
      const senderId = action.payload;

      if (!state.selectedUser || state.selectedUser._id !== senderId) {
        state.unreadMessages[senderId] =
          (state.unreadMessages[senderId] || 0) + 1;
      }
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getConversations.fulfilled, (state, action) => {
        state.conversations = action.payload.users;
      })

      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
      })

      .addCase(sendMessage.fulfilled, (state, action) => {
        const message = action.payload.message;

        state.messages.push(message);

        // UPDATE LAST MESSAGE

        const receiverId = state.selectedUser?._id;

        const conversation = state.conversations.find(
          (user) => user._id === receiverId,
        );

        if (conversation) {
          conversation.lastMessage = message.text || "Sent a file";

          // MOVE TOP

          const filtered = state.conversations.filter(
            (user) => user._id !== receiverId,
          );

          state.conversations = [conversation, ...filtered];
        }
      });
  },
});

export const { setSelectedUser, addMessage, setOnlineUsers, setUnreadMessage } =
  chatSlice.actions;

export default chatSlice.reducer;
