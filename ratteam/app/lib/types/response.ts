import { IUser, IUserData } from './types';

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
export interface IImageResponse {
  id: number;
  name: string;
  post_id: number | null;
}

export interface IError {
  message: string;
}
export interface IPostLike {
  id: number;
  user_id: number;
  post_id: number;
}
export interface ICommentLike {
  id: number;
  user_id: number;
  comment_id: number;
}
export interface IComment {
  id: number;
  user_id: number;
  post_id: number;
  text: string;
  User: IUser;
  CommentLikes: ICommentLike[];
  createdAt: string;
}
export interface PostData {
  id: number;
  header: string;
  body: string;
  user_id: number;
  isPosted: boolean;
  PostLikes: IPostLike[];
  Comments: IComment[];
  User: IUser;
  Images: IImageResponse[];
}
