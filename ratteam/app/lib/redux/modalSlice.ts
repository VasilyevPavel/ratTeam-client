import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModal {
  isOpen: boolean;
}

const initialState: IModal = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    changeModalStatus: (state: IModal, action: PayloadAction<void>) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { changeModalStatus } = modalSlice.actions;
export default modalSlice.reducer;
