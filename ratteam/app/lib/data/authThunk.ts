import { Dispatch } from 'redux';
import AuthService from './authService';
import { resetUserData, setMessage, setUserData } from '../redux/userSlice';
import { IUserData } from '../types/types';
import { AxiosError } from 'axios';
import { IError } from '../types/response';
import { useRouter } from 'next/navigation';

export const registerThunk = (formData: IUserData) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await AuthService.registration(formData);
      dispatch(setUserData(response.data));
      localStorage.setItem('token', response.data.accessToken);
    } catch (error) {
      const err = error as AxiosError<IError>;
      console.log(err.response?.data.message);
      const errorMessage = err.response?.data?.message || 'An error occurred';
      dispatch(setMessage(errorMessage));
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

      dispatch(setUserData(response.data));
      localStorage.setItem('token', response.data.accessToken);
    } catch (error) {
      const err = error as AxiosError<IError>;

      console.log(err.response?.data?.message);
      const errorMessage = err.response?.data?.message || 'An error occurred';
      dispatch(setMessage(errorMessage));
    }
  };
};

export const logoutThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      await AuthService.logout();
      dispatch(resetUserData());
      localStorage.removeItem('token');
      dispatch(setMessage(''));
      const requestHeaders = new Headers();
      requestHeaders.set('user', '');
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

      dispatch(setUserData(response.data));
      localStorage.setItem('token', response.data.accessToken);

      return response.data;
    } catch (error) {
      const err = error as AxiosError<IError>;

      console.log(err.response?.data?.message);
    }
  };
};

export const resetPass = (email: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const responseReset = await AuthService.resetPass(email);
    } catch (error) {
      const err = error as AxiosError<IError>;
      console.log(err.response?.data?.message);
    }
  };
};

export const newPass = (password: string, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await AuthService.newPass(password, token);
    } catch (error) {
      const err = error as AxiosError<IError>;
      console.log(err.response?.data?.message);
    }
  };
};
