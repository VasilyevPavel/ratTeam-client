"use client";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { RootState } from "@/app/lib/redux/store";
import LoginForm from "./LoginForm";
import RegistrationForm from "./registrationForm";
import {
  changeLoginModalStatus,
  changeModalStatus,
  changeRegistrationModalStatus,
} from "@/app/lib/redux/modalSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Auth() {
  const dispatch = useAppDispatch();
  const openModal = useAppSelector(
    (state: RootState) => state.modalSlice.isModalOpen,
  );
  const loginForm = useAppSelector(
    (state: RootState) => state.modalSlice.isLoginOpen,
  );
  console.log("loginForm", loginForm);
  const registrationForm = useAppSelector(
    (state: RootState) => state.modalSlice.isRegistrationOpen,
  );
  console.log("registrationForm", registrationForm);

  function closeModal() {
    if (loginForm) {
      dispatch(changeModalStatus());
      dispatch(changeLoginModalStatus());
    } else {
      dispatch(changeModalStatus());
      dispatch(changeRegistrationModalStatus());
    }
  }

  return (
    <div>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{loginForm ? <LoginForm /> : <RegistrationForm />}</Box>
      </Modal>
    </div>
  );
}
