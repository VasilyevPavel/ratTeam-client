import { AxiosError } from 'axios';
import { IError } from '../types/response';
import ImageService from './imageService';

export async function uploadPhoto(formData: FormData) {
  try {
    console.log('formDataformDataformData', formData);
    const response = await ImageService.imageUpload(formData);
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
    console.log('responseimagedelete', response);
    return response;
  } catch (error) {
    const err = error as AxiosError<IError>;
    console.log(err.response?.data.message);
    throw error;
  }
}
