'use client';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import { setShowReplayWindow } from '@/app/lib/redux/commentSlice';
import { RootState } from '@/app/lib/redux/store';

interface ReplayCommentButtonProps {
  commentId: number;
}

export default function ReplayCommentButton({
  commentId,
}: ReplayCommentButtonProps) {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(
    (state: RootState) => state.userSlice.userData
  );

  const replyHandler = () => {
    dispatch(setShowReplayWindow(commentId));
  };

  return (
    userData && (
      <button className="comments-info" onClick={replyHandler}>
        Ответить
      </button>
    )
  );
}
