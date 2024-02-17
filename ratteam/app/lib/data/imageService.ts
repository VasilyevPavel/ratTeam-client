import $api from '@/http';

import { IImageResponse } from '../types/response';
import axios from 'axios';

export default class ImageService {
  static async imageUpload(formData: FormData) {
    return $api.post<IImageResponse[]>(
      '/api/image/upload-post-photo',
      formData
    );
  }
  static async updatePhoto(postId: number, photoId: number) {
    return $api.put<IImageResponse[]>(
      `/api/image/update-post-image/${postId}/${photoId}`
    );
  }
  static async deletePhoto(id: number) {
    return $api.delete<IImageResponse[]>(`/api/image/delete-post-photo/${id}`);
  }
  static async getPostPhotos(id: number) {
    return axios.get<IImageResponse[]>(
      `${process.env.NEXT_PUBLIC_URL}/api/image/get-post-photos/${id}`,
      {
        withCredentials: true,
      }
    );
  }
  static async commentImageUpload(formData: FormData) {
    return $api.post<IImageResponse>(
      '/api/image/upload-comment-photo',
      formData
    );
  }
}
