import $api from '@/http';
import axios, { AxiosResponse } from 'axios';

export default class CommentService {
  static async saveComment(
    postId: number,
    text: string,
    commentPhotoId: number | null,
    replayCommentId?: number | undefined
  ): Promise<AxiosResponse> {
    const url = replayCommentId
      ? `/api/comments/create/${postId}/${replayCommentId}`
      : `/api/comments/create/${postId}`;

    return $api.post(url, { text, commentPhotoId });
  }
  static async setLike(commentId: number): Promise<AxiosResponse> {
    return $api.post('/api/comments/set-like', { commentId });
  }
}
