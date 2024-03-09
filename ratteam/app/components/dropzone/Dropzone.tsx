import { Suspense, useCallback, useEffect, useState } from 'react';
import { useDropzone, DropzoneState } from 'react-dropzone';
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

interface DropzoneProps {}

const Dropzone: React.FC<DropzoneProps> = () => {
  const dispatch = useAppDispatch();

  const images = useAppSelector((state: RootState) => state.postSlice.images);

  const postId = useAppSelector((state: RootState) => state.postSlice.id);

  useEffect(() => {
    const fetchImages = async () => {
      if (postId) {
        try {
          const images = await getPostPhotos(postId);

          setImages(images);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchImages();
  }, [postId]);

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

  const { getRootProps, getInputProps, isDragActive }: DropzoneState =
    useDropzone({
      accept: {
        'image/*': [],
      },
      maxSize: 1000 * 1000 * 1000,
      onDrop,
    });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div>
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      <div className={styles.photosBox}>
        {images.map((image) => (
          <ImagePreview key={image.id} image={image} />
        ))}
      </div>
    </>
  );
};

export default Dropzone;
