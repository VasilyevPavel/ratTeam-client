export interface IUserData {
  email: string;
  isActivated?: boolean;
  id?: string;
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
}
