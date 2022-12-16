import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../store/Slices/authSlice";
import { useForm } from "react-hook-form";
import classes from "./Accordion.module.css";
import { TextField } from "@mui/material";
import styles from "../Form/Login.module.css";
import ButtonMui from "../../UI/ButtonMui/ButtonMui";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { fetchUserPasswordChange } from "../../store/Fetching/UserFetching";
import _ from "lodash";

const PasswordChange = ({ setExpanded }) => {
  const { id } = useSelector((state) => state.auth.user);

  const { error, message } = useSelector((state) => state.auth);
  const [pasVisible, setPasVisible] = useState(false);
  const toggleHandlerPas = () => {
    setPasVisible((prevState) => !prevState);
  };

  const [newPasVisible, setNewPasVisible] = useState(false);
  const toggleHandlerNewPas = () => {
    setNewPasVisible((prevState) => !prevState);
  };

  const [confirmPasVisible, setConfirmPasVisible] = useState(false);
  const toggleHandlerConfirmPas = () => {
    setConfirmPasVisible((prevState) => !prevState);
  };

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
      id: id,
    },
    mode: "all",
  });

  const onSubmit = (values) => {
    dispatch(fetchUserPasswordChange(values)).then((res) => {
      if (!_.isEmpty(res.error)) {
        setExpanded("panel1");
      } else {
        dispatch(clearError());
        setTimeout(() => {
          setExpanded(false);
          return reset();
        }, 1700);
      }
    });
  };

  const password = watch("newPassword");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.personal_data}>
        <ul className={classes.personal_data_list}>
          <li className={classes.personal_data_item}>
            <label className={classes.personal_data_label}>
              Текущий пароль
            </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                className={styles.field}
                size="small"
                type={pasVisible ? "text" : "password"}
                {...register("password", {
                  required: "Введите пароль",
                  minLength: {
                    value: 6,
                    message: "Минимальная длина 6 символов",
                  },
                })}
                fullWidth
              />
              <span
                className={styles.eye}
                style={{ marginBottom: "19px" }}
                onClick={toggleHandlerPas}
              >
                {pasVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            <div style={{ height: "20" }}>
              {errors?.password && (
                <p className={styles.text}>{errors?.password.message}</p>
              )}
            </div>
            <label className={classes.personal_data_label}>Новый пароль</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                className={styles.field}
                size="small"
                type={newPasVisible ? "text" : "password"}
                {...register("newPassword", {
                  required: "Введите пароль",
                  minLength: {
                    value: 6,
                    message: "Минимальная длина 6 символов",
                  },
                })}
                fullWidth
              />
              <span
                className={styles.eye}
                style={{ marginBottom: "19px" }}
                onClick={toggleHandlerNewPas}
              >
                {newPasVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            <div style={{ height: "20" }}>
              {errors?.newPassword && (
                <p className={styles.text}>{errors?.newPassword.message}</p>
              )}
            </div>
            <label className={classes.personal_data_label}>
              Подтвердите новый пароль
            </label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                className={styles.field}
                size="small"
                type={confirmPasVisible ? "text" : "password"}
                {...register("confirmNewPassword", {
                  required: "Введите пароль",
                  validate: (value) =>
                    value === password || "Пароли не совпадают",
                  minLength: {
                    value: 6,
                    message: "Минимальная длина 6 символов",
                  },
                })}
                fullWidth
              />
              <span
                className={styles.eye}
                style={{ marginBottom: "19px" }}
                onClick={toggleHandlerConfirmPas}
              >
                {confirmPasVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            <div style={{ height: "20" }}>
              {errors?.confirmNewPassword && (
                <p className={styles.text}>
                  {errors?.confirmNewPassword.message}
                </p>
              )}
            </div>

            {error ? (
              <div style={{ marginBottom: "15px", color: "red" }}>{error}</div>
            ) : (
              ""
            )}
            {message ? (
              <div
                style={{
                  marginBottom: "15px",
                  color: "green",
                  fontSize: "22px",
                }}
              >
                {message}
              </div>
            ) : (
              ""
            )}

            <ButtonMui
              className={classes.button_edit}
              type="submit"
              size="large"
              variant="contained"
              color="success"
              disabled={!isValid}
            >
              Сохранить
            </ButtonMui>
            <ButtonMui
              style={{ marginLeft: "15px" }}
              onClick={() => reset()}
              className={classes.button_edit}
              size="large"
              variant="contained"
            >
              Отмена
            </ButtonMui>
          </li>
        </ul>
      </div>
    </form>
  );
};

export default PasswordChange;
