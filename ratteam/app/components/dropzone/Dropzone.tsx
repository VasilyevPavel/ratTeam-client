import { useCallback, useEffect, useState } from 'react';
import { useDropzone, DropzoneState } from 'react-dropzone';
import styles from './dropzone.module.css';
import ImagePreview from '../imagePreview/ImagePreview';
import { getPostPhotos, uploadPhoto } from '@/app/lib/data/imageData';
import { IImageResponse } from '@/app/lib/types/response';
import { CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import { RootState } from '@/app/lib/redux/store';
import { setImages } from '@/app/lib/redux/postSlice';

interface DropzoneProps {}

const Dropzone: React.FC<DropzoneProps> = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
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
          const formData = new FormData();
          acceptedFiles.forEach((file) => formData.append('photos', file));
          setLoading(true);
          const response = await uploadPhoto(formData);

          const newImages = response.data;

          dispatch(setImages(newImages));
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
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

  // useEffect(() => {
  //   return () => {
  //     images.forEach((file) => URL.revokeObjectURL(file.name));
  //   };
  // }, [images]);

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

      {loading && <CircularProgress className={styles.loadingSpinner} />}

      <div className={styles.photosBox}>
        {images.map((image) => (
          <ImagePreview key={image.id} image={image} />
        ))}
      </div>
    </>
  );
};

export default Dropzone;
