import React from 'react';
import Avatar from '../avatar/Avatar';
import { IComment, ICommentImages } from '@/app/lib/types/response';
import Likes from '@/app/ui/likes/Likes';
import ReplayCommentButton from '../ReplayCommentButton/ReplayCommentButton';
import AddComment from '../AddComment/AddComment';
import CommentImageModal from '../commentImageModal/CommentImageModal';

interface ICommentsProps {
  postId: number;
  comments: IComment[];
}

interface ICommentsMap {
  [key: number]: IComment[];
}

export default function Comments({ postId, comments }: ICommentsProps) {
  const commentsMap = comments.reduce((map, comment) => {
    const parentId = comment.parent_comment_id || 0;
    map[parentId] = map[parentId] || [];
    map[parentId].push(comment);
    return map;
  }, {} as ICommentsMap);

  const renderComments = (commentId: number, depth: number = 0) => {
    const nestedComments = (commentsMap[commentId] || []).sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return nestedComments.map((comment) => (
      <div
        key={comment.id}
        className={`comments-block ${depth > 0 ? 'nested-comment' : ''}`}
      >
        <div className="comments-user">
          <Avatar user={comment.User} style="comment" />
          {comment.User.name}
        </div>
        <div className="comments-text">{comment.text}</div>
        {comment.CommentImages && renderCommentImages(comment.CommentImages)}

        <div className="comments-text">
          <div className="comments-info">
            <Likes allLikes={comment.CommentLikes} commentId={comment.id} />
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
          <AddComment key={comment.id} postId={postId} commentId={comment.id} />
        </div>
        {renderComments(comment.id, depth + 1)}
      </div>
    ));
  };

  const renderCommentImages = (images: ICommentImages[]) => {
    return images.map((image) => (
      <CommentImageModal
        key={image.id}
        src={`${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${image.name}`}
        alt="Comment Image"
      />
    ));
  };

  return (
    <div className="comments">
      <div className="comments-head">
        <h3 className="comments-header">Комментарии</h3>
      </div>
      <AddComment key={0} postId={postId} />
      <div>{renderComments(0)}</div>
    </div>
  );
}
