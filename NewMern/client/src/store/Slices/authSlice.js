import { createSlice } from "@reduxjs/toolkit";
import {
  fetchForgotPassword,
  fetchRecoveryPassword,
  fetchUser,
  fetchUserAvatar,
  fetchUserDataChange,
  fetchUserGoogleLogin,
  fetchUserGoogleRegister,
  fetchUserLogin,
  fetchUserLoginChange,
  fetchUserPasswordChange,
  fetchUserRegister,
} from "../Fetching/UserFetching";

const initialState = {
  user: {},
  message: "",
  isLoading: false,
  isAuth: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: async (state) => {
      state.user = null;
      state.isAuth = false;
      await window.location.reload();
      window.localStorage.removeItem("token");
    },

    clearError: (state) => {
      state.error = "";
    },

    clearMessage: (state) => {
      state.message = "";
    },
  },
  extraReducers: {
    //РЕГИСТРАЦИЯ
    [fetchUserRegister.pending]: (state) => {
      state.isLoading = true;
      state.isAuth = false;
    },
    [fetchUserRegister.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
    },
    [fetchUserRegister.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },

    // ГУГЛ РЕГИСТРАЦИЯ
    [fetchUserGoogleRegister.pending]: (state) => {
      state.isLoading = true;
      state.isAuth = false;
    },
    [fetchUserGoogleRegister.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload.user;
    },
    [fetchUserGoogleRegister.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },

    // ЛОГИН
    [fetchUserLogin.pending]: (state) => {
      state.isLoading = true;
      state.isAuth = false;
    },
    [fetchUserLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload.user;
    },
    [fetchUserLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },

    //ГУГЛ ЛОГИН
    [fetchUserGoogleLogin.pending]: (state) => {
      state.isLoading = true;
      state.isAuth = false;
    },
    [fetchUserGoogleLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload.user;
    },
    [fetchUserGoogleLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },

    // ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
    [fetchUser.pending]: (state) => {
      state.isLoading = true;
      state.isAuth = false;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload;
    },
    [fetchUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },

    // //ОБНОВЛЕНИЕ ДАННЫХ ЮЗЕРА
    [fetchUserDataChange.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserDataChange.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [fetchUserDataChange.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // //ИЗМЕНЕНИЕ ЛОГИНА
    [fetchUserLoginChange.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserLoginChange.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [fetchUserLoginChange.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // //ИЗМЕНЕНИЕ ПАРОЛЯ
    [fetchUserPasswordChange.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserPasswordChange.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
    },
    [fetchUserPasswordChange.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // //ОТПРАВКА  ПАРОЛЯ
    [fetchForgotPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchForgotPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
    },
    [fetchForgotPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // //ВОССТАНОВЛЕНИЕ  ПАРОЛЯ
    [fetchRecoveryPassword.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchRecoveryPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = action.payload.user;
    },
    [fetchRecoveryPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // //ЗАГРУЗКА АВАТАРКИ
    [fetchUserAvatar.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserAvatar.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [fetchUserAvatar.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
export const { logout, clearError, clearMessage } = authSlice.actions;
export default authSlice.reducer;
