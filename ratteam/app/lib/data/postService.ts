import $api from '@/http';
import axios, { AxiosResponse } from 'axios';

export default class PostService {
  static async create(postData: {
    header: string;
    body: string;
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
}
