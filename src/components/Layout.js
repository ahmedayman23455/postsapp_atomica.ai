import React from "react";
import { Nav, Modal } from "../components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsOpen } from "../Redux/slices/ModalSlice";
import { AnimatePresence } from "framer-motion";
/* ------------------------------------------------------ */
const Layout = () => {
  const ModalIsOpen = useSelector(getIsOpen);

  return (
    <>
      <Nav />
      <main className="App">
        <Outlet />
      </main>

      <AnimatePresence>{ModalIsOpen && <Modal />}</AnimatePresence>
    </>
  );
};

export default Layout;
