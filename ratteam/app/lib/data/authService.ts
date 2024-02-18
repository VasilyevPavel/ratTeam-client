import $api from '@/http';
import { AxiosResponse } from 'axios';
import { IAuthResponse } from '../types/response';
import { IUserData } from '../types/types';
import axios from 'axios';
import { useAppDispatch } from '../redux/hooks';
import { checkAuthThunk } from './authThunk';

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/api/auth/login', { email, password });
  }
  static async registration(
    formData: IUserData
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/api/auth/registration', formData);
  }
  static async logout(): Promise<void> {
    return $api.post('/api/auth/logout');
  }
  static async checkAuth(): Promise<AxiosResponse<IAuthResponse>> {
    return axios.get(`${process.env.NEXT_PUBLIC_URL}/api/auth/refresh`, {
      withCredentials: true,
    });
  }

  static async resetPass(email: string): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/api/auth/forgot-password', { email });
  }
  static async newPass(
    password: string,
    token: string
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post(`/api/auth/reset-password/${token}`, { password });
  }
}
