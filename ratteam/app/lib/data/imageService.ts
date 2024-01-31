import $api from '@/http';

import { IImageResponse } from '../types/response';
import axios from 'axios';

export default class ImageService {
  static async imageUpload(formData: FormData) {
    return $api.post<IImageResponse[]>('/image/upload-photo', formData);
  }
  static async updatePhoto(postId: number, photoId: number) {
    return $api.put<IImageResponse[]>(
      `/image/update-image/${postId}/${photoId}`
    );
  }
  static async deletePhoto(id: number) {
    return $api.delete<IImageResponse[]>(`/image/delete-photo/${id}`);
  }
  static async getPostPhotos(id: number) {
    return axios.get<IImageResponse[]>(
      `${process.env.NEXT_PUBLIC_URL}/image/get-post-photos/${id}`,
      {
        withCredentials: true,
      }
    );
  }
}
