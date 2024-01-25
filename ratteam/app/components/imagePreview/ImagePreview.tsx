import Image from 'next/image';
import React, { useState } from 'react';
import styles from './imagePreview.module.css';
import { CircularProgress } from '@mui/material';
import ImageModal from '../imageModal/ImageModal';
import { IImageResponse } from '@/app/lib/types/response';
import { deletePhoto } from '@/app/lib/data/imageData';

interface imagePreviewProps {
  file: IImageResponse;
  files: IImageResponse[];
  setFiles: React.Dispatch<React.SetStateAction<IImageResponse[]>>;
}

export default function ImagePreview({
  file,
  files,
  setFiles,
}: imagePreviewProps) {
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [sureDelPhoto, setSureDelPhoto] = useState(false);
  const addImageHandler = (file: IImageResponse) => {
    setShowImageModal(true);
  };

  const removeFileHandler = () => {
    setSureDelPhoto(true);
  };
  const approveRemove = () => {
    deletePhoto(file.id);
    const filteredFiles = files.filter((el) => el.id !== file.id);
    setFiles(filteredFiles);
    setSureDelPhoto(false);
  };

  return (
    <>
      <ImageModal
        setShowImageModal={setShowImageModal}
        showImageModal={showImageModal}
        file={file}
      />
      <div key={file.id} className={styles.onePhotoBox}>
        {loading && <CircularProgress />}
        <Image
          className={styles.image}
          src={`${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${file.name}`}
          alt={file.name}
          width={150}
          height={0}
          sizes="100vw"
          style={{
            width: 'auto',
            height: 'auto',
            maxHeight: '150px',
          }}
          onLoad={() => {
            setLoading(false);
          }}
        />

        <div className={styles.photoControl}>
          <div className={styles.buttonBox}>
            <button
              type="button"
              className={styles.button}
              onClick={() => addImageHandler(file)}
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
