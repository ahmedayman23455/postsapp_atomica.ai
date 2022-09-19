import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  isOpen: false,
  status: "",
  message: "",
  to: "/",
};
const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    toggle(state) {
      state.isOpen = !state.isOpen;
    },

    setModal(state, action) {
      const { message, status, to } = action.payload;
      state.isOpen = !state.isOpen;
      state.message = message;
      state.status = status;
      state.to = to;
    },
  },
});

export const { setModal, toggle } = modalSlice.actions;

/* ---------------------- selectors --------------------- */
export const getIsOpen = (state) => state.modal.isOpen;
export const getModalStatus = (state) => state.modal.status;
export const getModalMessage = (state) => state.modal.message;
export const getUrl = (state) => state.modal.to;
/* ------------------------------------------------------ */
export default modalSlice.reducer;
