import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import requestReducer from "../features/request/requestSlice";
import chatReducer from "../features/chat/chatSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    request: requestReducer,
    chat: chatReducer,
  },
});