'use client';
import { addComment } from '@/app/lib/actions/commentFormActions';
import { uploadCommentPhoto } from '@/app/lib/data/imageData';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import { RootState } from '@/app/lib/redux/store';
import Image from 'next/image';
import { ChangeEvent, Suspense, lazy, useState } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { setShowReplayWindow } from '@/app/lib/redux/commentSlice';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import CommentImage from '../commentImage/CommentImage';
import { CircularProgress } from '@mui/material';

interface ICommentForm {
  postId: number;
  commentId?: number;
}

export default function CommentForm({ postId, commentId }: ICommentForm) {
  const [commentPhotoName, setCommentPhotoName] = useState<string | null>(null);

  const [commentPhotoId, setCommentPhotoId] = useState<number | null>(null);
  const [commentPhotoReplyName, setCommentPhotoReplyName] = useState<
    string | null
  >(null);
  const [commentReplyId, setCommentReplyId] = useState<number | null>(null);
  const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false);
  const showReplayWindow = useAppSelector(
    (state: RootState) => state.commentSlice.showReplayWindow
  );

  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const ref = useRef<HTMLFormElement>(null);

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoadingPhoto(true);
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      const response = await uploadCommentPhoto(formData);

      if (response) {
        if (showReplayWindow) {
          setCommentPhotoReplyName(response?.data?.name);
          setCommentReplyId(response?.data?.id);
          setLoadingPhoto(false);
        } else {
          setCommentPhotoName(response?.data?.name);
          setCommentPhotoId(response?.data?.id);
          setLoadingPhoto(false);
        }
      }
    }
  };

  if (!commentId) {
    return (
      <form
        onClick={() => {
          setCommentPhotoReplyName(null);
          setCommentPhotoName(null);
        }}
        className="form-text"
        ref={ref}
        action={async (formData) => {
          await addComment(formData, commentPhotoId, postId, pathname);

          setTimeout(() => {
            dispatch(setShowReplayWindow(null));
            setCommentPhotoName(null);
            setCommentPhotoId(null);
            setCommentPhotoReplyName(null);
            setCommentReplyId(null);
            ref.current?.reset();
          }, 0);
        }}
      >
        <textarea
          className="textField"
          placeholder="Введите комментарий"
          name="commentName"
        />

        <CommentImage
          commentPhotoName={commentPhotoName}
          commentPhotoReplyName={commentPhotoReplyName}
          loadingPhoto={loadingPhoto}
          handleFileUpload={handleFileUpload}
          setCommentPhotoName={setCommentPhotoName}
          setCommentPhotoReplyName={setCommentPhotoReplyName}
          commentPhotoId={commentPhotoId}
        />
      </form>
    );
  } else {
    return (
      <form
        className="form-text"
        ref={ref}
        action={async (formData) => {
          await addComment(
            formData,
            commentReplyId,
            postId,
            pathname,
            commentId
          );

          setTimeout(() => {
            dispatch(setShowReplayWindow(null));
            setCommentPhotoName(null);
            setCommentPhotoId(null);
            setCommentPhotoReplyName(null);
            setCommentReplyId(null);
            ref.current?.reset();
          }, 0);
        }}
      >
        <textarea
          className="textField"
          placeholder="Введите комментарий"
          name="commentName"
        />

        <CommentImage
          commentPhotoName={commentPhotoName}
          commentPhotoReplyName={commentPhotoReplyName}
          loadingPhoto={loadingPhoto}
          handleFileUpload={handleFileUpload}
          setCommentPhotoName={setCommentPhotoName}
          setCommentPhotoReplyName={setCommentPhotoReplyName}
          commentPhotoId={commentReplyId}
          isReply
        />
      </form>
    );
  }
}
