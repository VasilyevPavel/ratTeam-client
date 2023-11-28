"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModal {
  isModalOpen: boolean;
  isLoginOpen: boolean;
  isRegistrationOpen: boolean;
}

const initialState: IModal = {
  isModalOpen: false,
  isLoginOpen: false,
  isRegistrationOpen: false,
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    changeModalStatus: (state: IModal, action: PayloadAction<void>) => {
      state.isModalOpen = !state.isModalOpen;
    },
    changeLoginModalStatus: (state: IModal, action: PayloadAction<void>) => {
      state.isLoginOpen = !state.isLoginOpen;
    },
    changeRegistrationModalStatus: (
      state: IModal,
      action: PayloadAction<void>,
    ) => {
      state.isRegistrationOpen = !state.isRegistrationOpen;
    },
  },
});

export const {
  changeModalStatus,
  changeLoginModalStatus,
  changeRegistrationModalStatus,
} = modalSlice.actions;
export default modalSlice.reducer;
