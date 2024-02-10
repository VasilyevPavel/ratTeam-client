'use client';
import React, { useState } from 'react';
import Avatar from '../avatar/Avatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { saveComment } from '@/app/lib/data/commentData';
import { IComment } from '@/app/lib/types/response';
import { useAppSelector } from '@/app/lib/redux/hooks';
import { RootState } from '@/app/lib/redux/store';
import PostLike from '@/app/ui/likes/Likes';
import { useRouter } from 'next/navigation';
import Likes from '@/app/ui/likes/Likes';

interface ICommentsProps {
  postId: number;
  comments: IComment[];
}

export default function Comments({ postId, comments }: ICommentsProps) {
  const [text, setText] = useState('');

  const userData = useAppSelector(
    (state: RootState) => state.userSlice.userData
  );
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

  return (
    <div className="comments">
      <div className="comments-head">
        <h3 className="comments-header">Комментарии</h3>
      </div>
      {userData && (
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
      )}

      <div>
        {comments &&
          comments.map((comment) => (
            <div key={comment.id} className="comments-block">
              <div className="comments-user">
                <Avatar user={comment.User} style="comment" />
                {comment.User.name}{' '}
              </div>
              <div className="comments-text"> {comment.text}</div>
              <div className="comments-text">
                {' '}
                <div className="comments-info">
                  <Likes allLikes={comment.CommentLikes} id={comment.id} />
                </div>
                <div className="comments-info">Ответить</div>
                <div className="comments-info">
                  {new Date(comment.createdAt).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
