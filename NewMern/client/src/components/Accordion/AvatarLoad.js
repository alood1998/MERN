import React, { useState } from "react";
import classes from "./Accordion.module.css";
import ButtonMui from "../../UI/ButtonMui/ButtonMui";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAvatar } from "../../store/Fetching/UserFetching";

const AvatarLoad = () => {
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user);

  const handleChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleApi = () => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("id", id);

    dispatch(fetchUserAvatar(formData));
    setAvatar("");
  };

  return (
    <div className={classes.personal_data}>
      <ul className={classes.personal_data_list}>
        <li className={classes.personal_data_item}>
          <label className={classes.personal_data_label}>
            Аватар Пользователя
          </label>
          <div>
            <img
              width={100}
              src={avatar === "" ? "" : URL.createObjectURL(avatar)}
              alt=""
            />
            <input
              type="file"
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
            <ButtonMui
              onClick={handleApi}
              className={classes.button_edit}
              size="large"
              variant="contained"
              color="success"
            >
              Загрузить фото
            </ButtonMui>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AvatarLoad;
