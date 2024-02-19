'use server';
import { revalidatePath } from 'next/cache';
import { saveComment } from '../data/commentData';

export const addComment = async (
  formData: FormData,
  commentPhotoId: number | null,
  postId: number,
  pathname: string,
  commentId?: number
) => {
  const text = formData.get('commentName')?.toString();
  if (
    text !== undefined &&
    text !== null &&
    (text.trim().length > 0 || commentPhotoId)
  ) {
    if (commentId) {
      const response = await saveComment(
        postId,
        text,
        commentPhotoId,
        commentId
      );
      revalidatePath(pathname);
      return response;
    } else {
      const response = await saveComment(postId, text, commentPhotoId);

      revalidatePath(pathname);

      return response;
    }
  }
};
