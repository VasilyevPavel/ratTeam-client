import axios from 'axios';
import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from 'react';
import {
  useDropzone,
  DropzoneRootProps,
  DropzoneInputProps,
  FileRejection,
  DropzoneState,
  DropEvent,
} from 'react-dropzone';
import styles from './dropzone.module.css';
import ImageModal from './imageModal/ImageModal';

interface FilePreview extends File {
  preview: string;
}

interface RejectedFile {
  file: File;
  errors: { code: string; message: string }[];
}

export const Dropzone: React.FC<{
  setBody: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setBody }) => {
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [rejected, setRejected] = useState<RejectedFile[]>([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [file, setFile] = useState<FilePreview>();

  const onDrop = useCallback(
    async (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      console.log('Accepted Files:', acceptedFiles);
      console.log('File Rejections:', fileRejections);

      if (acceptedFiles.length) {
        // setFiles((previousFiles) => [
        //   ...previousFiles,
        //   ...acceptedFiles.map((file) => {
        //     const previewURL = URL.createObjectURL(file);
        //     const fileName = previewURL.substring(
        //       previewURL.lastIndexOf('/') + 1
        //     );

        //     return Object.assign(file, {
        //       preview: previewURL,
        //       fileName: fileName,
        //     });
        //   }),
        // ]);

        try {
          const formData = new FormData();
          acceptedFiles.forEach((file) => formData.append('photos', file));

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_URL}/post/upload-photo`,
            formData,
            {
              withCredentials: true,
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          );
          const images = response.data.images;
          setFiles(images);
          console.log('responsePhotos', response);
        } catch (error) {
          console.error(error);
        }
      }

      if (fileRejections.length) {
        setRejected(
          fileRejections.map((rejection) => ({
            file: rejection.file,
            errors: [{ code: 'rejected', message: 'File rejected' }],
          }))
        );
      }
    },
    [setBody]
  );
  const addImageHandler = (file: FilePreview) => {
    console.log('file', file);
    setShowImageModal(true);
    setFile(file);
    // const imageUrl = URL.createObjectURL(file);
    // console.log('imageUrl', imageUrl);

    // setBody((prevBody) => {
    //   const imgTag = `<div><img src="${imageUrl}" alt="${file.name}"/></div>`;
    //   return prevBody + imgTag;
    // });
  };

  const { getRootProps, getInputProps, isDragActive }: DropzoneState =
    useDropzone({
      accept: {
        'image/*': [],
      },
      maxSize: 1000 * 1000 * 1000,
      onDrop,
    });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (preview: string) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.preview !== preview)
    );
    setBody((prevBody) =>
      prevBody.replace(
        new RegExp(`<img\\s+src="${preview}"\\s+alt="[^"]*"\\s*/?>`, 'g'),
        ''
      )
    );
  };
  console.log('filesfilesfiles!!!', files);
  return (
    <>
      <ImageModal
        setShowImageModal={setShowImageModal}
        showImageModal={showImageModal}
        file={file}
        setFile={setFile}
      />
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

      {/* Preview */}
      <section>
        <div>
          <h2>Preview</h2>
        </div>

        {/* Accepted files */}
        <h3>Accepted Files</h3>
        <div className={styles.photosBox}>
          {files.map((file) => (
            <div key={file.name} className={styles.onePhotoBox}>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${file.name}`}
                alt={file.name}
                width={150}
                height={0}
                sizes="100vw"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '150px',
                }}
                onLoad={() => {
                  URL.revokeObjectURL(file.name);
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
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => removeFile(file.preview)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <ul className="mt-6 flex flex-col">
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className="flex items-start justify-between">
              <div>
                <p className="mt-2 text-neutral-500 text-sm font-medium">
                  {file.name}
                </p>
                <ul className="text-[12px] text-red-400">
                  {errors.map((error, index) => (
                    <li key={index}>{error.message}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul> */}
      </section>
    </>
  );
};

export default Dropzone;
