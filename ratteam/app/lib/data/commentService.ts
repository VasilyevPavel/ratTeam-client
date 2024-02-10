import $api from '@/http';
import axios, { AxiosResponse } from 'axios';

export default class CommentService {
  static async saveComment(
    postId: number,
    text: string,
    replayCommentId?: number | undefined
  ): Promise<AxiosResponse> {
    const url = replayCommentId
      ? `/comments/create/${postId}/${replayCommentId}`
      : `/comments/create/${postId}`;

    return $api.post(url, { text });
  }
  static async setLike(commentId: number): Promise<AxiosResponse> {
    return $api.post('/comments/set-like', { commentId });
  }
}
