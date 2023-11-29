import { IUserData } from "./types";

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUserData;
}
