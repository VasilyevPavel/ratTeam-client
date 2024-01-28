import $api from '@/http';

import { IImageResponse } from '../types/response';

export default class ImageService {
  static async imageUpload(formData: FormData) {
    return $api.post<IImageResponse[]>('/image/upload-photo', formData);
  }
  static async updatePhoto(postId: number, photoId: number) {
    return $api.put<IImageResponse[]>(`/update-image/${postId}/${photoId}`);
  }
  static async deletePhoto(id: number) {
    return $api.delete<IImageResponse[]>(`/image/delete-photo/${id}`);
  }
}