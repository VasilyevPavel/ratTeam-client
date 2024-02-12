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

  const router = useRouter();

  const saveCommentHandler = () => {
    if (text.trim().length > 0) {
      if (commentId) {
        saveComment(postId, text, commentId);
      } else {
        saveComment(postId, text);
      }
      setText('');
      setTimeout(() => {
        router.refresh();
        dispatch(setShowReplayWindow(null));
      }, 0);
    }
  };

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('file', file);
    // if (file) {
    //   const formData = new FormData();
    //   formData.append('image', file);
    //   try {
    //     const response = await fetch('/api/upload-image', {
    //       method: 'POST',
    //       body: formData,
    //     });
    //     if (response.ok) {
    //       console.log('Изображение успешно загружено на бэкенд');
    //     } else {
    //       console.error('Ошибка при загрузке изображения на бэкенд');
    //     }
    //   } catch (error) {
    //     console.error('Ошибка при выполнении запроса:', error);
    //   }
    // }
  };

  if (!userData) {
    return;
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
              id="raised-button-file"
              // multiple
              type="file"
              onChange={handleFileUpload}
            />
            <label htmlFor="raised-button-file">
              <AddAPhotoIcon sx={{ fontSize: '40px', cursor: 'pointer' }} />
            </label>
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
        {userData && (
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
                  <AddAPhotoIcon sx={{ fontSize: '40px', cursor: 'pointer' }} />
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
