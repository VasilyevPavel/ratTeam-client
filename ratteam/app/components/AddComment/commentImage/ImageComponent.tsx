import Image from 'next/image';
import React, { ChangeEvent, Suspense } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { deleteCommentPhoto } from '@/app/lib/data/imageData';

interface IImageComponent {
  photoUrl: string;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  setCommentPhotoName: (value: string | null) => void;
  setCommentPhotoReplyName: (value: string | null) => void;
  commentPhotoId: number | null;
}

export default function ImageComponent({
  photoUrl,
  handleFileUpload,
  setCommentPhotoName,
  setCommentPhotoReplyName,
  commentPhotoId,
}: IImageComponent) {
  const handleDeleteImage = () => {
    console.log('Удоли');
    deleteCommentPhoto(commentPhotoId);
    setCommentPhotoName(null);
    setCommentPhotoReplyName(null);
  };

  const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  return (
    <div style={{ position: 'relative' }}>
      <label
        htmlFor="reply-raised-button-file"
        style={{ display: 'inline-block' }}
      >
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="reply-raised-button-file"
          type="file"
          onChange={handleFileUpload}
        />

        <Image
          key={photoUrl}
          src={`${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${photoUrl}`}
          alt="comment image"
          width={50}
          height={50}
          placeholder={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 475)
          )}`}
          sizes="100vw"
          style={{ cursor: 'pointer', marginLeft: '10px' }}
        />
      </label>
      <ClearIcon
        style={{
          position: 'absolute',
          top: '-19px',
          right: '-19px',
          cursor: 'pointer',
          zIndex: 1,
          color: 'red',
        }}
        onClick={handleDeleteImage}
      />
    </div>
  );
}
