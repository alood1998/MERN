import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  fetchUserGoogleLogin,
  fetchUserGoogleRegister,
  fetchUserLogin,
  fetchUserRegister,
} from "../../store/Fetching/UserFetching";
import { Paper, TextField, Typography } from "@mui/material";
import styles from "./Login.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ButtonMui from "../../UI/ButtonMui/ButtonMui";
import { clearError} from "../../store/Slices/authSlice";
import ForgotPassword from "./Forgot-password";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";

const LoginForm = () => {
  const [pasVisible, setPasVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [remind, setRemind] = useState(true);
  const { isAuth } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/home";

  const dispatch = useDispatch();
  const clientId =
    "697772125486-ebldo9i6ni640erj1qmp5isbd414rddv.apps.googleusercontent.com";

  const initClient = () => {
    gapi.client.init({
      clientId: clientId,
      scope: "",
    });
  };
  gapi.load("client:auth2", initClient);

  const toggleHandlerPas = () => {
    setPasVisible((prevState) => !prevState);
  };
  const toggleIsLogin = () => {
    setIsLogin((prevState) => !prevState);
  };
  const toggleRemind = () => {
    setRemind((prevState) => !prevState);
  };

  const { error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      fullName: "",
      surName: "",
      password: "",
    },
    mode: "all",
  });

  useEffect(() => {
    if (isAuth) {
      navigate(fromPage);
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuth]);

  const onSuccess = async (res) => {
    if (isLogin) {
      const data = await dispatch(fetchUserGoogleLogin(res.profileObj));
      if ("token" in data.payload) {
        return window.localStorage.setItem("token", data.payload.token);
      }
    } else {
      const data = await dispatch(fetchUserGoogleRegister(res.profileObj));
      if ("token" in data.payload) {
        return window.localStorage.setItem("token", data.payload.token);
      }
    }
  };

  const onFailure = (err) => {
    console.log("failed", err);
  };

  const onSubmit = async (values) => {
    if (isLogin) {
      const data = await dispatch(fetchUserLogin(values));
      if ("token" in data.payload) {
        return window.localStorage.setItem("token", data.payload.token);
      }
    } else {
      const data = await dispatch(fetchUserRegister(values));
      if ("token" in data.payload) {
        return window.localStorage.setItem("token", data.payload.token);
      }
    }
  };

  return (
    <div>
      {remind ? (
        <Paper classes={{ root: styles.root }}>
          <Typography classes={{ root: styles.title }} variant="h5">
            {isLogin ? "????????" : "?????????????????????? ????????????????"}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {isLogin ? null : (
              <>
                <TextField
                  className={styles.field}
                  label="??????"
                  {...register("fullName", {
                    required: "???????? ?????????????????????? ?? ????????????????????",
                    minLength: {
                      value: 3,
                      message: "?????????????????????? ?????????? 3 ??????????????",
                    },
                  })}
                  fullWidth
                />
                <div style={{ height: "20" }}>
                  {errors?.fullName && (
                    <p className={styles.text}>{errors?.fullName.message}</p>
                  )}
                </div>
                <TextField
                  className={styles.field}
                  label="??????????????"
                  {...register("surName", {
                    required: "???????? ?????????????????????? ?? ????????????????????",
                    minLength: {
                      value: 3,
                      message: "?????????????????????? ?????????? 3 ??????????????",
                    },
                  })}
                  fullWidth
                />
                <div style={{ height: "20" }}>
                  {errors?.surName && (
                    <p className={styles.text}>{errors?.surName.message}</p>
                  )}
                </div>
              </>
            )}
            <TextField
              className={styles.field}
              label="Email"
              type={"email"}
              {...register("email", {
                required: "???????? ?????????????????????? ?? ????????????????????",
              })}
              fullWidth
            />
            <div style={{ height: "20" }}>
              {errors?.email && (
                <p className={styles.text}>{errors?.email.message}</p>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                className={styles.field}
                label="????????????"
                type={pasVisible ? "text" : "password"}
                {...register("password", {
                  required: "?????????????? ????????????",
                  minLength: {
                    value: 6,
                    message: "?????????????????????? ?????????? 6 ????????????????",
                  },
                })}
                fullWidth
              />
              <div className={styles.eye} onClick={toggleHandlerPas}>
                {pasVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <GoogleLogin
                clientId={clientId}
                buttonText="Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
              />
              <ButtonMui
                onClick={toggleRemind}
                className={styles.passwordRemind}
                size="small"
              >
                ?????????????????? ????????????
              </ButtonMui>
            </div>

            <div style={{ height: "20" }}>
              {errors?.password && (
                <p className={styles.text}>{errors?.password.message}</p>
              )}
            </div>
            <div style={{ marginBottom: "15px", color: "red" }}>
              {error ? error : ""}
            </div>
            <ButtonMui
              style={{ marginBottom: "10px" }}
              type="submit"
              size="large"
              disabled={!isValid}
              variant="contained"
              fullWidth
            >
              {isLogin ? "??????????" : "????????????????????????????????????"}
            </ButtonMui>
            <ButtonMui
              onClick={toggleIsLogin}
              className={styles.register}
              fullWidth
            >
              {isLogin ? "????????????????????????????????????" : " ?? ?????? ??????????????????????????????"}
            </ButtonMui>
          </form>
        </Paper>
      ) : (
        <ForgotPassword toggleRemind={toggleRemind} remind={remind} />
      )}
    </div>
  );
};

export default LoginForm;
