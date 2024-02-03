import $api from '@/http';
import axios, { AxiosResponse } from 'axios';
import { IAuthResponse, IImage } from '../types/types';

export default class PostService {
  static async create(postData: {
    header: string;
    body: string;
    isPosted?: boolean;
    images: IImage[];
  }): Promise<AxiosResponse> {
    return $api.post('/post/create', { postData });
  }
  static async update(
    id: number,
    postData: {
      header: string;
      body: string;
      isPosted?: boolean;
      images: IImage[];
    }
  ): Promise<AxiosResponse> {
    return $api.patch(`/post/update/${id}`, { postData });
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
  static async saveComment(
    postId: number,
    text: string,
    replayCommentId?: number
  ): Promise<AxiosResponse> {
    return $api.post<IAuthResponse>(`/create/${postId}/${replayCommentId}`, {
      text,
    });
  }
}
