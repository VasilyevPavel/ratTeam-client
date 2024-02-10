'use client';
import Link from 'next/link';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../lib/redux/hooks';
import { RootState } from '../lib/redux/store';

interface IEditButtonProps {
  postId: number;
  userId: number;
}

export default function EditButton({ postId, userId }: IEditButtonProps) {
  const editPostLink = `/blog/edit-post/${postId}`;

  const userData = useAppSelector(
    (state: RootState) => state.userSlice.userData
  );

  const isOwner = userData?.user.id === userId;

  return (
    <>
      {isOwner && (
        <div>
          <Link href={editPostLink}>
            <EditIcon />
          </Link>
        </div>
      )}
    </>
  );
}
