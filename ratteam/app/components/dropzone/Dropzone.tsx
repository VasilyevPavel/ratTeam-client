import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './dropzone.module.css';
import ImagePreview from '../imagePreview/ImagePreview';
import { getPostPhotos, uploadPhoto } from '@/app/lib/data/imageData';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import { RootState } from '@/app/lib/redux/store';
import {
  removeMockImage,
  setImageLoading,
  setImages,
} from '@/app/lib/redux/postSlice';

const Dropzone = () => {
  const dispatch = useAppDispatch();
  const images = useAppSelector((state: RootState) => state.postSlice.images);
  const postId = useAppSelector((state: RootState) => state.postSlice.id);

  useEffect(() => {
    const fetchImages = async () => {
      if (postId) {
        try {
          const fetchedImages = await getPostPhotos(postId);
          dispatch(setImages(fetchedImages));
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchImages();
  }, [postId, dispatch]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        try {
          dispatch(setImageLoading({ id: 0, name: 'mockup', post_id: null }));
          const formData = new FormData();
          acceptedFiles.forEach((file) => formData.append('photos', file));
          const response = await uploadPhoto(formData);
          const newImages = response.data;
          dispatch(removeMockImage());
          dispatch(setImages(newImages));
        } catch (error) {
          console.error(error);
        }
      }
    },
    [dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxSize: 1000 * 1000 * 1000,
    onDrop,
  });

  return (
    <div className={styles.dropzoneContainer}>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}
      >
        <input {...getInputProps()} />
        <p className={styles.dropzoneText}>
          {isDragActive
            ? 'Отпустите файл для загрузки'
            : 'Перетащите или нажмите, чтобы загрузить фото'}
        </p>
      </div>

      <div className={styles.photosBox}>
        {images.map((image) => (
          <ImagePreview key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default Dropzone;
