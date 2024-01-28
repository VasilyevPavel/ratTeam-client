import $api from '@/http';
import axios, { AxiosResponse } from 'axios';
import { IAuthResponse } from '../types/types';

export default class PostService {
  static async create(postData: {
    header: string;
    body: string;
    isPosted?: boolean;
  }): Promise<AxiosResponse> {
    return $api.post('/post/create', { postData });
  }
  static async getUserPosts(id: number): Promise<AxiosResponse> {
    // const headers = {
    //   Authorization: `Bearer ${refreshToken}`,
    // };
    return axios.get(`${process.env.NEXT_PUBLIC_URL}/post/get-posts/${id}`, {
      // headers,
      withCredentials: true,
    });
  }
  static async getAllPosts(): Promise<AxiosResponse> {
    return axios.get(`${process.env.NEXT_PUBLIC_URL}/post/get-all-posts/`, {
      withCredentials: true,
    });
  }
  static async setLike(userId: number, postId: number): Promise<AxiosResponse> {
    return $api.post<IAuthResponse>('/post/set-like', { userId, postId });
  }
  static async getOnePost(postId: number): Promise<AxiosResponse> {
    return axios.get<IAuthResponse>(
      `${process.env.NEXT_PUBLIC_URL}/post/get-post/${postId}`
    );
  }
}
