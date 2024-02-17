'use client';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import { RootState } from '@/app/lib/redux/store';
import React, { ChangeEvent, useState } from 'react';
import Avatar from '../avatar/Avatar';
import { useRouter } from 'next/navigation';
import { saveComment } from '@/app/lib/data/commentData';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Zoom from '@mui/material/Zoom';
import { setShowReplayWindow } from '@/app/lib/redux/commentSlice';
import { Button } from '@mui/material';
import { uploadCommentPhoto } from '@/app/lib/data/imageData';
import Image from 'next/image';

interface AddCommentProps {
  postId: number;
  commentId?: number;
}

export default function AddComment({ postId, commentId }: AddCommentProps) {
  const userData = useAppSelector(
    (state: RootState) => state.userSlice.userData
  );
  const showReplayWindow = useAppSelector(
    (state: RootState) => state.commentSlice.showReplayWindow
  );

  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const [commentPhotoName, setCommentPhotoName] = useState<string | null>(null);
  const [commentPhotoId, setCommentPhotoId] = useState<number | null>(null);
  const [commentReplyName, setCommentReplyName] = useState<string | null>(null);
  const [commentReplyId, setCommentReplyId] = useState<number | null>(null);

  const router = useRouter();

  const saveCommentHandler = () => {
    if (text.trim().length > 0 || commentPhotoId || commentReplyId) {
      if (commentId) {
        saveComment(postId, text, commentReplyId, commentId);
      } else {
        saveComment(postId, text, commentPhotoId);
      }
      setText('');
      setTimeout(() => {
        router.refresh();
        dispatch(setShowReplayWindow(null));
        setCommentPhotoName(null);
        setCommentPhotoId(null);
        setCommentReplyName(null);
        setCommentReplyId(null);
      }, 0);
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      const response = await uploadCommentPhoto(formData);

      if (response) {
        if (showReplayWindow) {
          setCommentReplyName(response?.data?.name);
          setCommentReplyId(response?.data?.id);
        } else {
          setCommentPhotoName(response?.data?.name);
          setCommentPhotoId(response?.data?.id);
        }
      }
    }
  };

  if (!userData) {
    return null;
  } else if (!commentId) {
    return (
      <div className="comments-form">
        <div className="comment-control">
          <Avatar />

          <textarea
            className="textField"
            placeholder="Введите комментарий"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <div className="controls">
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="main-raised-button-file"
              type="file"
              onChange={handleFileUpload}
            />
            {commentPhotoName ? (
              <Image
                key={commentPhotoName}
                src={`${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${commentPhotoName}`}
                alt="comment image"
                width={50}
                height={50}
                sizes="100vw"
              />
            ) : (
              <label htmlFor="main-raised-button-file">
                <AddAPhotoIcon sx={{ fontSize: '40px', cursor: 'pointer' }} />
              </label>
            )}

            <button className="comment-btn" onClick={saveCommentHandler}>
              Отправить{' '}
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {userData && showReplayWindow && (
          <Zoom in={showReplayWindow === commentId} timeout={300} unmountOnExit>
            <div className="comments-form.show">
              <div className="comment-control">
                <Avatar />

                <textarea
                  className="textField"
                  placeholder="Введите комментарий"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
                <div className="controls">
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="reply-raised-button-file"
                    type="file"
                    onChange={handleFileUpload}
                  />
                  {commentReplyName ? (
                    <Image
                      key={commentReplyName}
                      src={`${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${commentReplyName}`}
                      alt="comment image"
                      width={50}
                      height={50}
                      sizes="100vw"
                    />
                  ) : (
                    <label htmlFor="reply-raised-button-file">
                      <AddAPhotoIcon
                        sx={{ fontSize: '40px', cursor: 'pointer' }}
                      />
                    </label>
                  )}

                  <button className="comment-btn" onClick={saveCommentHandler}>
                    Отправить{' '}
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        )}
      </>
    );
  }
}
