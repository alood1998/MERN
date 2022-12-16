import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axiosFetch";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`api/posts`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const fetchMyPosts = createAsyncThunk(
  "posts/fetchMyPosts",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`api/posts/my_posts/${id}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const fetchPostsRemove = createAsyncThunk(
  "posts/fetchPostsRemove",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`api/posts/${id}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const fetchPostCreate = createAsyncThunk(
  "posts/fetchPostCreate",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post(`api/posts`, params);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`api/posts/${id}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Error loading");
    }
  }
);

export const fetchPostViews = createAsyncThunk(
  "posts/fetchPostViews",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`api/posts/viewed/${id}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Error loading");
    }
  }
);

export const fetchPostLike = createAsyncThunk(
  "posts/fetchPostLike",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post(`api/posts/like`, params);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Error loading");
    }
  }
);

export const fetchPostUnlike = createAsyncThunk(
  "posts/fetchPostUnlike",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post(`api/posts/unlike`, params);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Error loading");
    }
  }
);
