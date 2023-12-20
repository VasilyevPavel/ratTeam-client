import { IUserData } from './types';

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUserData;
}

export interface IError {
  message: string;
}
