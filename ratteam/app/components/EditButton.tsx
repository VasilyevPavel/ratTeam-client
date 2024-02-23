'use client';
import Link from 'next/link';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '../lib/redux/hooks';
import { RootState } from '../lib/redux/store';
import { setPostHeader, setPostId } from '../lib/redux/postSlice';

interface IEditButtonProps {
  postId: number;
  userId: number;
}

export default function EditButton({ postId, userId }: IEditButtonProps) {
  const dispatch = useAppDispatch();

  const editPostLink = `/blog/edit-post/`;

  const userData = useAppSelector(
    (state: RootState) => state.userSlice.userData
  );

  const isOwner = userData?.user.id === userId;

  return (
    <>
      {isOwner && (
        <div
          onClick={() => {
            dispatch(setPostId(postId));
          }}
        >
          <Link href={editPostLink}>
            <EditIcon />
          </Link>
        </div>
      )}
    </>
  );
}
