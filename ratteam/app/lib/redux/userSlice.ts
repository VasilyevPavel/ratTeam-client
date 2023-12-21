import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthResponse } from '../types/response';
import { UserState } from '../types/types';

const initialUserState: UserState = {
  userData: null,
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
  },
});

export default userSlice.reducer;
export const { setUserData, resetUserData } = userSlice.actions;
