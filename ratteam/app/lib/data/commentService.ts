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
    console.log('token', token);
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
    // Получаем токен из серверных куки
    const token = await serverCookie();

    // Отправляем запрос на сервер с помощью fetch
    const response = await fetch(
      // Используем переменную окружения для URL API
      `${process.env.ENV_LOCAL_URL}/api/comments/set-like`,
      {
        next: { tags: ['likes'] },
        method: 'POST', // Определяем метод запроса
        credentials: 'include', // Включаем отправку куки в запросе
        headers: {
          'Content-Type': 'application/json', // Устанавливаем заголовок Content-Type
          Cookie: `refreshToken=${token}`, // Устанавливаем куку с токеном аутентификации
        },
        body: JSON.stringify({ commentId }), // Преобразуем тело запроса в формат JSON
      }
    );
  }
}
