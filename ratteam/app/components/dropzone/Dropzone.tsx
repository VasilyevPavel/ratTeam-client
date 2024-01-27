import { useCallback, useEffect, useState } from 'react';
import { useDropzone, DropzoneState } from 'react-dropzone';
import styles from './dropzone.module.css';
import ImagePreview from '../imagePreview/ImagePreview';
import { uploadPhoto } from '@/app/lib/data/imageData';
import { IImageResponse } from '@/app/lib/types/response';
import { CircularProgress } from '@mui/material';

interface DropzoneProps {}

const Dropzone: React.FC<DropzoneProps> = () => {
  const [files, setFiles] = useState<IImageResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      try {
        const formData = new FormData();
        acceptedFiles.forEach((file) => formData.append('photos', file));
        setLoading(true);
        const response = await uploadPhoto(formData);

        const newImages = response.data;
        setFiles((prevFiles) => [...prevFiles, ...newImages]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive }: DropzoneState =
    useDropzone({
      accept: {
        'image/*': [],
      },
      maxSize: 1000 * 1000 * 1000,
      onDrop,
    });

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.name));
    };
  }, [files]);

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
        {files.map((file) => (
          <ImagePreview
            key={file.id}
            file={file}
            files={files}
            setFiles={setFiles}
          />
        ))}
      </div>
    </>
  );
};

export default Dropzone;
