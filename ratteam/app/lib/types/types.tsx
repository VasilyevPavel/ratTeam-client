export interface IUserData {
  avatar?: string;
  isAdmin?: boolean;
  email: string;
  isActivated?: boolean;
  id?: number;
  name?: string;
  password: string;
}
export interface IUser {
  email: string;
  isActivated: boolean;
  isAdmin: boolean;
  avatar: string;
  id: number;
  name: string;
  password: string;
}
export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUserData;
}
export interface UserState {
  userData: IAuthResponse | null;
  message?: string;
}

export interface PostBody {
  header: string;
  body: string;
}
