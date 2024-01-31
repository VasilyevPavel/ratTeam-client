import { AxiosError } from 'axios';
import { IError } from '../types/response';
import ImageService from './imageService';

export async function uploadPhoto(formData: FormData) {
  try {
    const response = await ImageService.imageUpload(formData);
    return response;
  } catch (error) {
    const err = error as AxiosError<IError>;
    console.log(err.response?.data.message);
    throw error;
  }
}
export async function updatePhoto(postId: number, photoId: number) {
  try {
    const response = await ImageService.updatePhoto(postId, photoId);

    return response;
  } catch (error) {
    const err = error as AxiosError<IError>;
    console.log(err.response?.data.message);
    throw error;
  }
}

export async function deletePhoto(id: number) {
  try {
    const response = await ImageService.deletePhoto(id);

    return response;
  } catch (error) {
    const err = error as AxiosError<IError>;
    console.log(err.response?.data.message);
    throw error;
  }
}
export async function getPostPhotos(id: number) {
  try {
    const response = await ImageService.getPostPhotos(id);

    return response.data;
  } catch (error) {
    const err = error as AxiosError<IError>;
    console.log(err.response?.data.message);
    throw error;
  }
}
