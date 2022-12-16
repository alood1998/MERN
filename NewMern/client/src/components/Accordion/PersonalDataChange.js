import React from "react";
import classes from "./Accordion.module.css";
import { MenuItem, Select, TextField } from "@mui/material";
import ButtonMui from "../../UI/ButtonMui/ButtonMui";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataChange } from "../../store/Fetching/UserFetching";

const PersonalDataChange = ({ toggleEdit, setEditData }) => {
  const { fullName, surName, patronymic, gender, birthday, id } = useSelector(
    (state) => state.auth.user
  );
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: fullName ? fullName : "Не указано",
      surName: surName ? surName : "Не указана",
      patronymic: patronymic ? patronymic : "Не указано",
      gender: gender ? gender : "Не указан",
      birthday: birthday ? birthday : "ДД.ММ.ГГГГ",
      id: id,
    },
    mode: "all",
  });
  const selectValue = watch("gender");
  const handleChange = (e) => setValue("gender", e.target.value);
  const onSubmit = (values) => {
    dispatch(fetchUserDataChange(values));
    return setEditData((prevState) => !prevState);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.personal_data}>
        <ul className={classes.personal_data_list}>
          <li className={classes.personal_data_item}>
            <label className={classes.personal_data_label}>Фамилия</label>
            <TextField
              size="small"
              variant="outlined"
              {...register("surName", {
                required: "Введите более 2-х символов",
                minLength: {
                  value: 3,
                  message: "Введите более 2-х символов",
                },
              })}
            />
            <div style={{ height: "20" }}>
              {errors?.surName && (
                <p className={classes.text}>{errors?.surName.message}</p>
              )}
            </div>
          </li>
          <li className={classes.personal_data_item}>
            <label className={classes.personal_data_label}>Имя</label>
            <TextField
              size="small"
              variant="outlined"
              {...register("fullName", {
                required: "Введите более 2-х символов",
                minLength: {
                  value: 3,
                  message: "Введите более 2-х символов",
                },
              })}
            />
            <div style={{ height: "20" }}>
              {errors?.fullName && (
                <p className={classes.text}>{errors?.fullName.message}</p>
              )}
            </div>
          </li>
          <li className={classes.personal_data_item}>
            <label className={classes.personal_data_label}>Отчество</label>
            <TextField
              size="small"
              variant="outlined"
              {...register("patronymic", {
                required: "Введите более 2-х символов",
                minLength: {
                  value: 3,
                  message: "Введите более 2-х символов",
                },
              })}
            />
            <div style={{ height: "20" }}>
              {errors?.patronymic && (
                <p className={classes.text}>{errors?.patronymic.message}</p>
              )}
            </div>
          </li>
          <li className={classes.personal_data_item}>
            <label className={classes.personal_data_label}>Дата рождения</label>
            <TextField
              id="date"
              type="date"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              {...register("birthday")}
            />
            <div style={{ height: "20" }}>
              {errors?.birthday && (
                <p className={classes.text}>{errors?.birthday.message}</p>
              )}
            </div>
          </li>
          <li className={classes.personal_data_item}>
            <label className={classes.personal_data_label}>Пол</label>
            <Select
              value={selectValue}
              onChange={handleChange}
              style={{ width: "222px", height: "40px" }}
            >
              <MenuItem value={"Мужчина"}>Мужчина</MenuItem>
              <MenuItem value={"Женщина"}>Женщина</MenuItem>
            </Select>
          </li>
        </ul>
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
          onClick={toggleEdit}
          className={classes.button_edit}
          size="large"
          variant="contained"
        >
          Отмена
        </ButtonMui>
      </div>
    </form>
  );
};

export default PersonalDataChange;
