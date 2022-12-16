import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import classes from "./Accordion.module.css";
import { TbUserCircle } from "react-icons/tb";
import { AiOutlineLock } from "react-icons/ai";
import { RiEditBoxLine } from "react-icons/ri";
import { MdSecurity } from "react-icons/md";
import { SlUserFollowing } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import ButtonMui from "../../UI/ButtonMui/ButtonMui";
import { clearError, clearMessage } from "../../store/Slices/authSlice";
import * as moment from "moment";
import "moment/locale/ru";
import PersonalDataChange from "./PersonalDataChange";
import LoginChange from "./LoginChange";
import PasswordChange from "./PasswordChange";
import AvatarLoad from "./AvatarLoad";

const AccordionMui = () => {
  const { fullName, surName, email, patronymic, gender, birthday } =
    useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const [editData, setEditData] = useState(true);
  const toggleEdit = () => {
    setEditData((prevState) => !prevState);
  };

  const [loginChange, setLoginChange] = useState(true);
  const toggleLoginChange = () => {
    setLoginChange((prevState) => !prevState);
  };

  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (!expanded) {
      dispatch(clearMessage());
    }
  }, [expanded]);

  useEffect(() => {
    if (!loginChange) {
      dispatch(clearError());
    }
  }, [loginChange]);

  return (
    <div className={classes.accordion_container}>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.personal_header}>
            <span style={{ marginTop: "3px" }}>
              <TbUserCircle />
            </span>
            <Typography>Личные данные</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {editData ? (
            <div className={classes.personal_data}>
              <ul className={classes.personal_data_list}>
                <li className={classes.personal_data_item}>
                  <label className={classes.personal_data_label}>Фамилия</label>
                  <p style={{ fontSize: "14px" }}>
                    {surName ? surName : "Не указано"}
                  </p>
                </li>
                <li className={classes.personal_data_item}>
                  <label className={classes.personal_data_label}>Имя</label>
                  <p style={{ fontSize: "14px" }}>{fullName}</p>
                </li>
                <li className={classes.personal_data_item}>
                  <label className={classes.personal_data_label}>
                    Отчество
                  </label>
                  <p style={{ fontSize: "14px" }}>
                    {patronymic ? patronymic : "Не указано"}
                  </p>
                </li>
                <li className={classes.personal_data_item}>
                  <label className={classes.personal_data_label}>
                    Дата рождения
                  </label>
                  <p style={{ fontSize: "14px" }}>
                    {birthday === "ДД.ММ.ГГГГ"
                      ? "Не указана"
                      : moment(birthday).format("DD MMMM YYYY")}
                  </p>
                </li>
                <li className={classes.personal_data_item}>
                  <label className={classes.personal_data_label}>Пол</label>
                  <p style={{ fontSize: "14px" }}>
                    {gender ? gender : "Не указан"}
                  </p>
                </li>
              </ul>
              <ButtonMui
                onClick={toggleEdit}
                className={classes.button_edit}
                size="large"
                variant="contained"
                color="success"
              >
                Редактировать
              </ButtonMui>
            </div>
          ) : (
            <PersonalDataChange
              setEditData={setEditData}
              toggleEdit={toggleEdit}
            />
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <div className={classes.personal_header}>
            <span style={{ marginTop: "3px" }}>
              <AiOutlineLock />
            </span>
            <Typography>Логин</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {loginChange ? (
            <div className={classes.personal_data}>
              <ul className={classes.personal_data_list}>
                <li className={classes.personal_data_item}>
                  <label className={classes.personal_data_label}>
                    Логин (электронная почта)
                  </label>
                  <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                    {email}
                  </p>
                  <div
                    className={classes.log_change_button}
                    onClick={toggleLoginChange}
                  >
                    <span style={{ marginTop: "2.5px" }}>
                      <RiEditBoxLine />
                    </span>
                    <Typography>Изменить</Typography>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <LoginChange
              setLoginChange={setLoginChange}
              toggleLoginChange={toggleLoginChange}
            />
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion className={classes.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <div className={classes.personal_header}>
            <span style={{ marginTop: "3px" }}>
              <SlUserFollowing />
            </span>
            <Typography>Персонализация</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <AvatarLoad />
        </AccordionDetails>
      </Accordion>

      <Accordion
        className={classes.accordion}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <div className={classes.personal_header}>
            <span style={{ marginTop: "3px" }}>
              <MdSecurity />
            </span>
            <Typography>Пароль</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <PasswordChange setExpanded={setExpanded} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionMui;
