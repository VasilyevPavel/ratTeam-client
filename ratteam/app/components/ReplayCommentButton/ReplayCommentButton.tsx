'use client';
import React from 'react';
import { useAppDispatch } from '@/app/lib/redux/hooks';
import { setShowReplayWindow } from '@/app/lib/redux/commentSlice';

export default function ReplayCommentButton({ commentId }) {
  const dispatch = useAppDispatch();

  const replyHandler = () => {
    dispatch(setShowReplayWindow(commentId));
  };

  return (
    <button className="comments-info" onClick={replyHandler}>
      Ответить
    </button>
  );
}
