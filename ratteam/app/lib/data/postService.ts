import $api from '@/http';
import axios, { AxiosResponse } from 'axios';
import { IAuthResponse, IImage } from '../types/types';
import { revalidatePath } from 'next/cache';

export default class PostService {
  static async create(postData: {
    header: string;
    body: string;
    isPosted?: boolean;
    images: IImage[];
  }): Promise<AxiosResponse> {
    return $api.post('/api/post/create', { postData });
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
    return $api.patch(`/api/post/update/${id}`, { postData });
  }
  static async getUserPosts(id: number): Promise<AxiosResponse> {
    return axios.get(`${process.env.ENV_LOCAL_URL}/api/post/get-posts/${id}`, {
      withCredentials: true,
    });
  }
  static async getAllPosts(): Promise<AxiosResponse> {
    return axios.get(`${process.env.ENV_LOCAL_URL}/api/post/get-all-posts/`, {
      withCredentials: true,
    });
  }
  static async setLike(postId: number): Promise<AxiosResponse> {
    return $api.post('/api/post/set-like', { postId });
  }
  static async getOnePost(postId: number): Promise<AxiosResponse> {
    return axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/post/get-post/${postId}`
    );
  }
  static async saveComment(
    postId: number,
    text: string,
    replayCommentId?: number
  ): Promise<AxiosResponse> {
    return $api.post<IAuthResponse>(
      `/api/comments/create/${postId}/${replayCommentId}`,
      {
        text,
      }
    );
  }
}
