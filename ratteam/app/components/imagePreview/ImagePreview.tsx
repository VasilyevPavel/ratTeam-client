import Image from 'next/image';
import React, { useState } from 'react';
import styles from './imagePreview.module.css';
import { CircularProgress } from '@mui/material';
import ImageModal from '../imageModal/ImageModal';
import { IImageResponse } from '@/app/lib/types/response';
import { deletePhoto } from '@/app/lib/data/imageData';
import { useAppDispatch } from '@/app/lib/redux/hooks';
import { deleteImage } from '@/app/lib/redux/postSlice';
import { IImage } from '@/app/lib/types/types';

interface ImageProps {
  image: IImage;
}

export default function ImagePreview({ image }: ImageProps) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [sureDelPhoto, setSureDelPhoto] = useState(false);

  const dispatch = useAppDispatch();

  const addImageHandler = (file: IImageResponse) => {
    setShowImageModal(true);
  };

  const removeFileHandler = () => {
    setSureDelPhoto(true);
  };
  const approveRemove = () => {
    deletePhoto(image.id);
    dispatch(deleteImage(image.id));

    setSureDelPhoto(false);
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

  if (image.id === 0) {
    return <CircularProgress />;
  } else {
    return (
      <>
        <ImageModal
          setShowImageModal={setShowImageModal}
          showImageModal={showImageModal}
          image={image}
        />

        <div key={image.id} className={styles.onePhotoBox}>
          <Image
            className={styles.image}
            src={`${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${image.name}`}
            alt={image.name}
            width={150}
            height={0}
            sizes="100vw"
            placeholder={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            style={{
              width: 'auto',
              height: 'auto',
              maxHeight: '150px',
            }}
            // onLoad={() => {
            //   setLoading(false);
            // }}
          />

          <div className={styles.photoControl}>
            <div className={styles.buttonBox}>
              <button
                type="button"
                className={styles.button}
                onClick={() => addImageHandler(image)}
              >
                Вставить в текст
              </button>
            </div>

            <div className={styles.buttonBox}>
              <button type="button" className={styles.button}>
                Заменить
              </button>
            </div>
            <div className={styles.buttonBox}>
              {sureDelPhoto ? (
                <>
                  {' '}
                  <button
                    className={styles.sureButtonYes}
                    onClick={approveRemove}
                  >
                    Да
                  </button>
                  <button
                    className={styles.sureButtonNo}
                    onClick={() => {
                      setSureDelPhoto(false);
                    }}
                  >
                    Нет
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className={styles.button}
                  onClick={removeFileHandler}
                >
                  Удалить
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
