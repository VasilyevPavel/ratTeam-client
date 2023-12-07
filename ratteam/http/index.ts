import { IAuthResponse } from '@/app/lib/types/response';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<IAuthResponse>(
          `${process.env.NEXT_PUBLIC_URL}/refresh`,
          {
            withCredentials: true,
          }
        );
        localStorage.setItem('token', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    throw error;
  }
);

export default $api;
