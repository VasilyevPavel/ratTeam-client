export interface IUserData {
  email: string;
  isActivated?: boolean;
  id?: number;
  name?: string;
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
