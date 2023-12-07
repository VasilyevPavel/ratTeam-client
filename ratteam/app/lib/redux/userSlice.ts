import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  password: '',
  isActivated: false,
  isAuth: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    user(state, action) {
      const user = action.payload.user;
      state.name = user.name;
      state.email = user.email;
      state.isActivated = user.isActivated;
      state.isAuth = true;
    },
    resetUserData(state) {
      state.name = '';
      state.email = '';
      state.password = '';
      state.isActivated = false;
      state.isAuth = false;
    },
    changeLoadingStatus(state) {
      state.isLoading = !state.isLoading;
    },
  },
});

export default userSlice.reducer;
export const { user, resetUserData, changeLoadingStatus } = userSlice.actions;
