import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

interface IImageComponent {
  photoUrl: string;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageComponent({
  photoUrl,
  handleFileUpload,
}: IImageComponent) {
  const handleDeleteImage = () => {
    console.log('Удоли');
  };

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
