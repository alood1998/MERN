import React from "react";
import "./MyModal.css";

const MyModal = ({ children, active, setActive }) => {
  return (
    <div
      className={active ? "myModal active" : "myModal"}
      onClick={() => setActive(false)}
    >
      <div className={"myModalContent"} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MyModal;
