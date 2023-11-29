import { Dispatch } from "redux";
import AuthService from "./authService";
import { resetUserData, user } from "../redux/userSlice";
import { IUserData } from "../types/types";

export const registerThunk = (formData: IUserData) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await AuthService.registration(formData);
      dispatch(user(response.data));
      localStorage.setItem("token", response.data.accessToken);
    } catch (err) {
      console.log(err.response?.data.message);
    }
  };
};

export const loginThunk = (inputsData: { email: string; password: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await AuthService.login(
        inputsData.email,
        inputsData.password,
      );
      dispatch(user(response.data));
      localStorage.setItem("token", response.data.accessToken);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };
};

export const logoutThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      await AuthService.logout();
      dispatch(resetUserData());
      localStorage.removeItem("token");
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };
};
