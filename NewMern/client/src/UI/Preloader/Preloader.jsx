import React from "react";
import classes from "./Preloader.module.css";

const Preloader = () => {
  return (
    <div className={classes.preloader}>
      <div className={classes.ldsDualRing}></div>
    </div>
  );
};

export default Preloader;
