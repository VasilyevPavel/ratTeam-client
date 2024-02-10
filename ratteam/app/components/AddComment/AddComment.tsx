'use client';
import { useAppSelector } from '@/app/lib/redux/hooks';
import { RootState } from '@/app/lib/redux/store';
import React, { useState } from 'react';
import Avatar from '../avatar/Avatar';
import { useRouter } from 'next/navigation';
import { saveComment } from '@/app/lib/data/commentData';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Zoom from '@mui/material/Zoom';

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

  const [text, setText] = useState('');

  const router = useRouter();

  const saveCommentHandler = () => {
    if (text.trim().length > 0) {
      saveComment(postId, text);
      setText('');
      setTimeout(() => {
        router.refresh();
      }, 0);
    }
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
            <AddAPhotoIcon sx={{ fontSize: '40px', cursor: 'pointer' }} />
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
