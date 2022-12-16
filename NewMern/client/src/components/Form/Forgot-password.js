import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Login.module.css";
import { Paper, TextField, Typography } from "@mui/material";
import ButtonMui from "../../UI/ButtonMui/ButtonMui";
import {
  fetchForgotPassword,
  fetchRecoveryPassword,
} from "../../store/Fetching/UserFetching";
import _ from "lodash";
import { clearError, clearMessage } from "../../store/Slices/authSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ForgotPassword = ({ toggleRemind, remind }) => {
  const [isSendMail, setIsSendMail] = useState(false);
  const [pasVisible, setPasVisible] = useState(false);
  const { error, message } = useSelector((state) => state.auth);

  const toggleHandlerPas = () => {
    setPasVisible((prevState) => !prevState);
  };
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    mode: "all",
  });
  useEffect(() => {
    return () => {
      dispatch(clearMessage());
      dispatch(clearError());
    };
  }, [remind]);

  const onSubmit = async (values) => {
    if (!isSendMail) {
      dispatch(fetchForgotPassword(values)).then((res) => {
        if (!_.isEmpty(res.error)) {
          setIsSendMail(false);
        } else {
          dispatch(clearError());
          setIsSendMail(true);
        }
      });
    } else {
      const data = await dispatch(fetchRecoveryPassword(values));
      if ("token" in data.payload) {
        return window.localStorage.setItem("token", data.payload.token);
      }
    }
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <TextField
            className={styles.field}
            label="Email"
            type={"email"}
            {...register("email", {
              required: "Поле обязательно к заполнению",
            })}
            fullWidth
          />
          <div style={{ height: "20" }}>
            {errors?.email && (
              <p className={styles.text}>{errors?.email.message}</p>
            )}
          </div>

          {isSendMail ? null : (
            <div>
              {error ? (
                <div style={{ marginBottom: "15px", color: "red" }}>
                  {error}
                </div>
              ) : (
                ""
              )}
            </div>
          )}

          {message ? (
            <div
              style={{ marginBottom: "15px", color: "red", fontSize: "12px" }}
            >
              {message}
            </div>
          ) : (
            ""
          )}

          {isSendMail ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                className={styles.field}
                label="Временный пароль"
                type={pasVisible ? "text" : "password"}
                {...register("newPassword", {
                  required: "Введите пароль",
                  minLength: {
                    value: 6,
                    message: "Минимальная длина 6 символов",
                  },
                })}
                fullWidth
              />
              <div className={styles.eye} onClick={toggleHandlerPas}>
                {pasVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </div>
            </div>
          ) : null}

          {!isSendMail ? null : (
            <div>
              {error ? (
                <div style={{ marginBottom: "15px", color: "red" }}>
                  {error}
                </div>
              ) : (
                ""
              )}
            </div>
          )}

          <ButtonMui
            style={{ marginBottom: "10px", height: "40px" }}
            type="submit"
            size="small"
            disabled={!isValid}
            variant="contained"
            fullWidth
          >
            {isSendMail ? "Войти" : "Получить временный пароль"}
          </ButtonMui>
          <ButtonMui
            onClick={toggleRemind}
            className={styles.register}
            fullWidth
          >
            Я вспомнил свой пароль
          </ButtonMui>
        </>
      </form>
    </Paper>
  );
};

export default ForgotPassword;
