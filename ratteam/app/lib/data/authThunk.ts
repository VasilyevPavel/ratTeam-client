import { Dispatch } from 'redux';
import AuthService from './authService';
import { resetUserData, user } from '../redux/userSlice';
import { IUserData } from '../types/types';
import { AxiosError } from 'axios';
import { IError } from '../types/response';

export const registerThunk = (formData: IUserData) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await AuthService.registration(formData);
      dispatch(user(response.data));
      localStorage.setItem('token', response.data.accessToken);
    } catch (error) {
      const err = error as AxiosError<IError>;
      console.log(err.response?.data.message);
    }
  };
};

export const loginThunk = (inputsData: { email: string; password: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await AuthService.login(
        inputsData.email,
        inputsData.password
      );
      console.log('response', response);
      dispatch(user(response.data));
      localStorage.setItem('token', response.data.accessToken);
    } catch (error) {
      const err = error as AxiosError<IError>;

      console.log(err.response?.data?.message);
    }
  };
};

export const logoutThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      await AuthService.logout();
      dispatch(resetUserData());
      localStorage.removeItem('token');
    } catch (error) {
      const err = error as AxiosError<IError>;
      console.log(err.response?.data?.message);
    }
  };
};

export const checkAuthThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await AuthService.checkAuth();
      dispatch(user(response.data));
      localStorage.setItem('token', response.data.accessToken);
    } catch (error) {
      const err = error as AxiosError<IError>;

      console.log(err.response?.data?.message);
    }
  };
};

export const resetPass = (email: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await AuthService.resetPass(email);
    } catch (error) {
      const err = error as AxiosError<IError>;
      console.log(err.response?.data?.message);
    }
  };
};
