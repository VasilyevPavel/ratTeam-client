'use client';
import { useAppSelector } from '@/app/lib/redux/hooks';
import { RootState } from '@/app/lib/redux/store';
import React from 'react';
import Avatar from '../avatar/Avatar';
import Zoom from '@mui/material/Zoom';
import CommentForm from './commentForm/CommentForm';

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

  if (!userData) {
    return null;
  } else if (!commentId) {
    return (
      <div className="comments-form">
        <div className="comment-control">
          <Avatar />

          <CommentForm postId={postId} commentId={commentId} />
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
                <CommentForm postId={postId} commentId={commentId} />
              </div>
            </div>
          </Zoom>
        )}
      </>
    );
  }
}
