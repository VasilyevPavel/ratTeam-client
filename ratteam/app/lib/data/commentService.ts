import $api from '@/http';
import { serverCookie } from '@/http/indexSSR';
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

    const token = await serverCookie();

    const response = await axios.post(
      `${process.env.ENV_LOCAL_URL}${url}`,
      {
        text,
        commentPhotoId,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${token}`,
        },
      }
    );

    return response.data;
    // return $api.post(url, { text, commentPhotoId });
  }
  static async setLike(commentId: number) {
    const token = await serverCookie();

    const response = await fetch(
      `${process.env.ENV_LOCAL_URL}/api/comments/set-like`,
      {
        next: { tags: ['likes'] },
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${token}`,
        },
        body: JSON.stringify({ commentId }),
      }
    );
  }
}
