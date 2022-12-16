import React from "react";
import { Button } from "@mui/material";

const ButtonMui = (props) => {
  return <Button {...props}>{props.children}</Button>;
};

export default ButtonMui;
