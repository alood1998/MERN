import React from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { SlLogout } from "react-icons/sl";
import classes from "./Layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/Slices/authSlice";
import Drawer from "../Drawer/Drawer";

const Layout = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const { avatar } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const location = useLocation();

  const onClickLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className={classes.container}>
        <header className={classes.header}>
          <Drawer />
        </header>
        <header className={classes.header}>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/posts">Blog</NavLink>
          <NavLink to="/about">About</NavLink>
        </header>
        <div className={classes.buttonsHeader}>
          <span>
            <Link to={isAuth ? null : "/login"} state={{ from: location }}>
              {avatar ? (
                <div>
                  <img
                    className={classes.avatar}
                    src={avatar}
                    alt="user image"
                  />
                </div>
              ) : (
                <FaUser className={classes.img_style} />
              )}
            </Link>
          </span>
          {isAuth ? (
            <span>
              <SlLogout onClick={onClickLogout} className={classes.img_style} />
            </span>
          ) : null}
        </div>
      </div>
      <main className={"container"}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
