import React, { useState } from "react";
import classes from "./Nav.module.scss";
import { useNavigate, NavLink } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import { Fade as Hamburger } from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------ */
const Nav = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery("only screen and (min-width: 640px)");
  const [isOpen, setIsOpen] = useState(true);

  const body = document.querySelector("body");
  if (isOpen & !matches) {
    // Disable scroll
    body.style.overflow = "hidden";
  } else {
    // Enable scroll
    body.style.overflow = "auto";
  }
  return (
    <div className={`${classes.nav}`}>
      <div className={`${classes.container}`}>
        <div
          className={`${classes.nav_logo}`}
          onClick={() => {
            navigate("/");
          }}
        >
          <h5>AHEMD AYMAN</h5>
        </div>

        {!matches && (
          <Hamburger
            toggled={isOpen}
            toggle={setIsOpen}
            size={25}
            color={isOpen ? "#fff" : "#1D4ED8"}
          />
        )}

        <div
          className={`${classes.nav_right} ${
            matches ? classes.desktop : classes.mobile
          }
          ${isOpen ? classes.opened : classes.closed}
          `}
        >
          <ul>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ``
              }
              end={true}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ``
              }
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Posts
            </NavLink>
            <NavLink
              to="/addPost"
              className={({ isActive }) =>
                isActive ? `${classes.active}` : ``
              }
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Add Post
            </NavLink>
          </ul>

          {matches && (
            <div className={`${classes.avatar}`}>

            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && !matches && (
          <motion.div
            className={`${classes.overlay}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setIsOpen((prevState) => !prevState)}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
