'use client';
import React, { useState } from 'react';
import Avatar from '../avatar/Avatar';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { saveComment } from '@/app/lib/data/commentData';
import { IComment } from '@/app/lib/types/response';

interface ICommentsProps {
  postId: number;
  comments: IComment[];
}

export default function Comments({ postId, comments }: ICommentsProps) {
  const [text, setText] = useState('');

  const saveCommentHandler = () => {
    saveComment(postId, text);
    setText('');
  };

  return (
    <div className="comments">
      <div className="comments-head">
        <h3 className="comments-header">Комментарии</h3>
      </div>
      <div className="comments-form">
        <Avatar />

        <div className="comment-control">
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
      <div>
        {comments &&
          comments.map((comment) => (
            <div key={comment.id} className="comments-block">
              <div className="comments-user">
                <Avatar user={comment.User} />
                {comment.User.name}{' '}
              </div>
              <div className="comments-text"> {comment.text}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
