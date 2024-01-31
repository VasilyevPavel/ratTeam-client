import Link from 'next/link';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

interface IEditButtonProps {
  postId: number;
}

export default function EditButton({ postId }: IEditButtonProps) {
  const editPostLink = `/blog/edit-post/${postId}`;

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
