'use server';
import { AxiosError } from 'axios';
import CommentService from './commentService';
import { IError } from '../types/response';

export async function saveComment(
  postId: number,
  text: string,
  commentPhotoId: number | null,
  replayCommentId?: number
) {
  try {
    const response = await CommentService.saveComment(
      postId,
      text,
      commentPhotoId,
      replayCommentId
    );
    return response;
  } catch (error) {
    const err = error as AxiosError<IError>;

    console.log(err.response?.data?.message);
  }
}
