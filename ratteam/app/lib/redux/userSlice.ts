import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  isActivated: false,
  isAuth: false,
};

const userSlice = createSlice({
  name: "userSlice",
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
      state.name = "";
      state.email = "";
      state.password = "";
      isActivated: false;
      isAuth: false;
    },
  },
});

export default userSlice.reducer;
export const { user, resetUserData } = userSlice.actions;
