import $api from "@/http";
import { AxiosResponse } from "axios";
import { IAuthResponse } from "../types/response";
import { IUserData } from "../types/types";

export default class AuthService {
  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>("/login", { email, password });
  }
  static async registration(
    formData: IUserData,
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>("/auth/registration", formData);
  }
  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}
