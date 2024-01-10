import { IUserData } from './types';

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUserData;
}

export interface IError {
  message: string;
}
export interface PostData {
  id: number;
  header: string;
  body: string;
  user_id: number;
}
