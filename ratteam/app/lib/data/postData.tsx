import { headers } from 'next/headers';
import PostService from './postService';
import { IError, PostData } from '../types/response';
import { AxiosError } from 'axios';

export async function getUserPosts() {
  try {
    const headersList = headers();
    const domain = (await headersList).get('host') || '';
    const referer = (await headersList).get('referer') || '';
    const [, pathname] =
      referer.match(new RegExp(`http?:\/\/${domain}(.*)`)) || [];

    const middlewareSet = (await headersList).get('user');
    let user = null;

    if (middlewareSet) {
      const decodedUser = Buffer.from(middlewareSet, 'base64').toString(
        'utf-8'
      );
      user = JSON.parse(decodedUser);
    }
    const response = await PostService.getUserPosts(user.id);
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: PostData[] = await response.data;

    return data;
  } catch (error) {
    const err = error as AxiosError<IError>;

    console.log(err.response?.data?.message);
  }
}
export async function getAllPosts() {
  try {
    const response = await PostService.getAllPosts();
    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: PostData[] = await response.data;
    return data;
  } catch (error) {
    const err = error as AxiosError<IError>;

    console.log(err.response?.data?.message);
  }
}
export async function getOnePost(postId: number) {
  try {
    const response = await PostService.getOnePost(postId);

    if (response.status !== 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: PostData = await response.data;

    return data;
  } catch (error) {
    const err = error as AxiosError<IError>;

    console.log(err.response?.data?.message);
  }
}
