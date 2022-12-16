import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./Slices/postSlice";
import authReducer from "./Slices/authSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});
