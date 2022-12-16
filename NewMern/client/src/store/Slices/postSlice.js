import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMyPosts,
  fetchPostById,
  fetchPostCreate,
  fetchPostLike,
  fetchPosts,
  fetchPostsRemove,
  fetchPostUnlike,
} from "../Fetching/PostFetching";

const initialState = {
  posts: [],
  myPosts: [],
  postsId: [],
  isLoading: false,
  error: "",
};

const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPostsError: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    //ПОЛУЧЕНИЕ ПОСТОВ
    [fetchPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: setError,

    //ПОЛУЧЕНИЕ МОИХ ПОСТОВ
    [fetchMyPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchMyPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myPosts = action.payload;
    },
    [fetchMyPosts.rejected]: setError,

    //УДАЛЕНИЕ ПОСТОВ
    [fetchPostsRemove.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPostsRemove.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myPosts = state.myPosts.filter(
        (el) => el._id !== action.payload.post._id
      );
    },
    [fetchPostsRemove.rejected]: setError,

    //СОЗДАНИЕ ПОСТОВ
    [fetchPostCreate.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPostCreate.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.myPosts.push(action.payload.post);
    },
    [fetchPostCreate.rejected]: setError,

    //ПОЛУЧЕНИЕ ПОСТА ПО ID
    [fetchPostById.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPostById.fulfilled]: (state, action) => {
      state.postsId = action.payload;
      state.error = "";
    },
    [fetchPostById.rejected]: setError,

    //ЛАЙК ПОСТА
    [fetchPostLike.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPostLike.fulfilled]: (state, action) => {
      state.postsId = action.payload;
      state.error = "";
    },
    [fetchPostLike.rejected]: setError,

    //АНЛАЙК ПОСТА
    [fetchPostUnlike.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchPostUnlike.fulfilled]: (state, action) => {
      state.postsId = action.payload;
      state.error = "";
    },
    [fetchPostUnlike.rejected]: setError,
  },
});
export const { clearPostsError } = postsSlice.actions;
export default postsSlice.reducer;
