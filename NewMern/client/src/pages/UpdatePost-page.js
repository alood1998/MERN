import React from "react";
import { TextField } from "@mui/material";
import styles from "../components/Form/Login.module.css";
import ButtonMui from "../UI/ButtonMui/ButtonMui";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios/axiosFetch";

const UpdatePostPage = () => {
  const { postsId } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: postsId.title,
      body: postsId.body,
    },
    mode: "all",
  });
  const onSubmit = async (values) => {
    const { data } = await axios.patch(`api/posts/${id}`, values);
    navigate(-1);
    return data;
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
          {errors?.title && <p>{errors?.title.message}</p>}
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
          {errors?.body && <p>{errors?.body.message}</p>}
        </div>

        <ButtonMui
          style={{ marginBottom: "10px" }}
          type="submit"
          size="large"
          disabled={!isValid}
          variant="contained"
          fullWidth
        >
          Редактировать пост
        </ButtonMui>
      </form>
    </div>
  );
};

export default UpdatePostPage;
