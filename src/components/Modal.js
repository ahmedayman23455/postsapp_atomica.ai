import React from "react";
import classes from "./Modal.module.scss";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getModalStatus,
  getModalMessage,
  getIsOpen,
  getUrl,
  toggle,
} from "../Redux/slices/ModalSlice";
import failedIcon from "../images/failedIcon.png";
import succeededIcon from "../images/succeededIcon.png";
import Button from "./Button";
/* ------------------------------------------------------ */

const Modal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ModalStatus = useSelector(getModalStatus);
  const ModalMessage = useSelector(getModalMessage);
  const modelIsOpen = useSelector(getIsOpen);
  const destinationUrl = useSelector(getUrl);

  const body = document.querySelector("body");
  if (modelIsOpen) {
    // Disable scroll
    body.style.overflow = "hidden";
  } else {
    // Enable scroll
    body.style.overflow = "auto";
  }

  /* ------------ variants ------------ */
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <motion.div
      className={classes.modal__overlay}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="initial"
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div
        className={classes.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.modal_content_header}>
          <img
            src={ModalStatus === "success" ? succeededIcon : failedIcon}
            alt="Status Icon "
          />
          <h2
            className={`${
              ModalStatus === "success" ? classes.success : classes.error
            }`}
          >
            {ModalStatus}
          </h2>
        </div>
        <p>{ModalMessage}</p>

        <Button
          text={ModalStatus === "success" ? "Continue" : "Try again"}
          className={`${classes.modal_content_btn} ${
            ModalStatus === "success" ? classes.success : classes.error
          }`}
          onClick={(e) => {
            e.preventDefault();
            navigate(destinationUrl);
            dispatch(toggle());
          }}
        />
      </div>
    </motion.div>
  );
};

export default Modal;
