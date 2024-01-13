import { IUserData } from './types';

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUserData;
}

export interface IError {
  message: string;
}
export interface IPostLike {
  id: number;
  user_id: number;
  post_id: number;
}
export interface IComment {
  id: number;
  user_id: number;
  post_id: number;
  text: string;
}
export interface PostData {
  id: number;
  header: string;
  body: string;
  user_id: number;
  PostLikes: IPostLike[];
  Comments: IComment[];
}
