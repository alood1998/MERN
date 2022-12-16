import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axiosFetch";

export const fetchUserRegister = createAsyncThunk(
  "auth/fetchUserRegister",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post(`api/registration`, params);
      return data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const fetchUserGoogleRegister = createAsyncThunk(
  "auth/fetchUserGoogleRegister",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post(`api/google-registration`, params);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const fetchUserLogin = createAsyncThunk(
  "auth/fetchUserLogin",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post(`api/login`, params);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const fetchUserGoogleLogin = createAsyncThunk(
  "auth/fetchUserGoogleLogin",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post(`api/google-login`, params);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`api/auth/me`);
      return data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const fetchUserDataChange = createAsyncThunk(
  "auth/fetchUserDataChange",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post(`api/user-data-change`, params);
      return data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const fetchUserLoginChange = createAsyncThunk(
  "auth/fetchUserLoginChange",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post(`api/change-email`, params);
      return data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const fetchUserPasswordChange = createAsyncThunk(
  "auth/fetchUserPasswordChange",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post(`api/change-password`, params);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const fetchForgotPassword = createAsyncThunk(
  "auth/fetchForgotPassword",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post(`api/forgot-password`, params);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const fetchRecoveryPassword = createAsyncThunk(
  "auth/fetchRecoveryPassword",
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.post(`api/recovery-password`, params);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const fetchUserAvatar = createAsyncThunk(
  "auth/fetchUserAvatar",
  async (formData, thunkAPI) => {
    try {
      const { data } = await axios.post(`api/avatar`, formData);
      return data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);
