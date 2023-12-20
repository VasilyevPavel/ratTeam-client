'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModal {
  isModalOpen: boolean;
  isLoginOpen: boolean;
  isRegistrationOpen: boolean;
  isForgotPassOpen: boolean;
}

const initialState: IModal = {
  isModalOpen: false,
  isLoginOpen: false,
  isRegistrationOpen: false,
  isForgotPassOpen: false,
};

const modalSlice = createSlice({
  name: 'modalSlice',
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
      action: PayloadAction<void>
    ) => {
      state.isRegistrationOpen = !state.isRegistrationOpen;
    },
    changeForgotPasssModalStatus: (
      state: IModal,
      action: PayloadAction<void>
    ) => {
      state.isForgotPassOpen = !state.isForgotPassOpen;
    },
  },
});

export const {
  changeModalStatus,
  changeLoginModalStatus,
  changeRegistrationModalStatus,
  changeForgotPasssModalStatus,
} = modalSlice.actions;
export default modalSlice.reducer;
