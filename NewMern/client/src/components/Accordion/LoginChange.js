import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import classes from "./Accordion.module.css";
import { TextField } from "@mui/material";
import styles from "../Form/Login.module.css";
import ButtonMui from "../../UI/ButtonMui/ButtonMui";
import { fetchUserLoginChange } from "../../store/Fetching/UserFetching";
import { clearError } from "../../store/Slices/authSlice";
import _ from "lodash";

const LoginChange = ({ setLoginChange, toggleLoginChange }) => {
  const { email, id } = useSelector((state) => state.auth.user);
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: email,
      id: id,
    },
    mode: "all",
  });

  const onSubmit = (values) => {
    dispatch(fetchUserLoginChange(values)).then((res) => {
      if (!_.isEmpty(res.error)) {
        setLoginChange(false);
      } else {
        dispatch(clearError());
        setLoginChange(true);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.personal_data}>
        <ul className={classes.personal_data_list}>
          <li className={classes.personal_data_item}>
            <label className={classes.personal_data_label}>
              Логин (электронная почта)
            </label>
            <TextField
              className={styles.field}
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
            <div style={{ marginBottom: "15px", color: "red" }}>
              {error ? error : ""}
            </div>
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
              onClick={toggleLoginChange}
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

export default LoginChange;
