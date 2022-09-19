import React from "react";
import classes from "./Button.module.scss";

/* ------------------------------------------------------ */
const Button = ({ text, onClick, style: buttonStyles = {}, className }) => {
  const classNames = [classes.button, className].join(" ").trim();
  return (
    <button className={classNames} style={buttonStyles} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
