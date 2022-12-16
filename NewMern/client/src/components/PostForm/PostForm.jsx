import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchPostCreate } from "../../store/Fetching/PostFetching";
import { TextField } from "@mui/material";
import styles from "../Form/Login.module.css";
import ButtonMui from "../../UI/ButtonMui/ButtonMui";

const PostForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
    mode: "all",
  });
  const onSubmit = (values) => {
    dispatch(fetchPostCreate(values));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Заголовок"
          {...register("title", {
            required: "Должен быть заголовок",
            minLength: {
              value: 3,
              message: "Минимальная длина 3 символов",
            },
          })}
          fullWidth
        />
        <div style={{ height: "20" }}>
          {errors?.title && (
            <p className={styles.text}>{errors?.title.message}</p>
          )}
        </div>
        <div>
          <TextField
            className={styles.field}
            label="Текст"
            {...register("body", {
              required: "Должен быть текст поста",
              minLength: {
                value: 10,
                message: "Минимальная длина 10 символов",
              },
            })}
            fullWidth
          />
        </div>
        <div style={{ height: "20" }}>
          {errors?.body && (
            <p className={styles.text}>{errors?.body.message}</p>
          )}
        </div>

        <ButtonMui
          style={{ marginBottom: "10px" }}
          type="submit"
          size="large"
          disabled={!isValid}
          variant="contained"
          fullWidth
        >
          Создать пост
        </ButtonMui>
      </form>
    </div>
  );
};

export default PostForm;
