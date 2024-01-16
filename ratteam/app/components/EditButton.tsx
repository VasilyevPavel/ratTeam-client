'use client';
import Link from 'next/link';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../lib/redux/hooks';
import { RootState } from '../lib/redux/store';

export default function EditButton() {
  const userData = useAppSelector(
    (state: RootState) => state.userSlice.userData
  );
  if (!userData) {
    return <></>;
  } else {
    const editPostLink = `/edit-post/${userData.user.id}`;

    return (
      <>
        <div>
          <Link href={editPostLink}>
            <EditIcon />
          </Link>
        </div>
      </>
    );
  }
}
