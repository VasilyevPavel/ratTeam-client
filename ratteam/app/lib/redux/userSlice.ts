import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthResponse } from '../types/response';
import { UserState } from '../types/types';

const initialUserState: UserState = {
  userData: null,
  message: '',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: initialUserState,
  reducers: {
    setUserData(state, action: PayloadAction<IAuthResponse>) {
      state.userData = action.payload;
    },
    resetUserData(state) {
      state.userData = null;
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    setNewAvatar(state, action: PayloadAction<string>) {
      if (state.userData) {
        state.userData.user.avatar = action.payload;
      }
    },
  },
});

export default userSlice.reducer;
export const { setUserData, resetUserData, setMessage, setNewAvatar } =
  userSlice.actions;
