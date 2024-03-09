import { IAuthResponse } from '@/app/lib/types/response';
import axios from 'axios';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_URL || process.env.ENV_LOCAL_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        console.log('сработал рефреш');
        const response = await axios.get<IAuthResponse>(
          `${process.env.NEXT_PUBLIC_URL}/api/auth/refresh`,
          {
            withCredentials: true,
          }
        );
        console.log('responseresponseresponse', response.data.accessToken);
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
