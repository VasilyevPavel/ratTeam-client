import $api from '@/http';

import { IImageResponse } from '../types/response';
import axios from 'axios';
import { IAuthResponse, IAvatarUpdate, UserState } from '../types/types';

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
      `${process.env.ENV_LOCAL_URL}/api/image/get-post-photos/${id}`,
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
  static async avatarImageUpload(formData: FormData) {
    return $api.post<IAvatarUpdate>('/api/image/upload-avatar-photo', formData);
  }
  static async commentImageDelete(id: number | null) {
    return $api.delete<IAuthResponse[]>(
      `/api/image/delete-comment-photo/${id}`
    );
  }
}
