import React from 'react';
import Avatar from '../avatar/Avatar';
import { IComment } from '@/app/lib/types/response';
import Likes from '@/app/ui/likes/Likes';
import ReplayCommentButton from '../ReplayCommentButton/ReplayCommentButton';
import AddComment from '../AddComment/AddComment';

interface ICommentsProps {
  postId: number;
  comments: IComment[];
}

export default function Comments({ postId, comments }: ICommentsProps) {
  return (
    <div className="comments">
      <div className="comments-head">
        <h3 className="comments-header">Комментарии</h3>
      </div>
      <AddComment postId={postId} />
      <div>
        {comments &&
          comments.map((comment) => (
            <div key={comment.id} className="comments-block">
              <div className="comments-user">
                <Avatar user={comment.User} style="comment" />
                {comment.User.name}
              </div>
              <div className="comments-text">{comment.text}</div>
              <div className="comments-text">
                <div className="comments-info">
                  <Likes
                    allLikes={comment.CommentLikes}
                    id={comment.id}
                    comment
                  />
                </div>
                <ReplayCommentButton commentId={comment.id} />
                <div className="comments-info">
                  {new Date(comment.createdAt).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>

              <div>
                <AddComment postId={postId} commentId={comment.id} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
