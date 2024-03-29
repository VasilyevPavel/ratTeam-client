'use client';
import React, { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import { TextField } from '@mui/material';
import styles from './imageModal.module.css';
import { IImageResponse } from '@/app/lib/types/response';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import { addImage } from '@/app/lib/redux/postSlice';
import { RootState } from '@/app/lib/redux/store';

interface ImageModalProps {
  showImageModal: boolean;
  setShowImageModal: React.Dispatch<React.SetStateAction<boolean>>;
  image: IImageResponse | null;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ImageModal: React.FC<ImageModalProps> = ({
  showImageModal,
  setShowImageModal,
  image,
}) => {
  const [description, setDescription] = useState<string>('');
  const dispatch = useAppDispatch();
  const images = useAppSelector((state: RootState) => state.postSlice.images);

  const handleClose = () => setShowImageModal(false);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const addDescriptionHandler = () => {
    if (image) {
      const imageUrl = `${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${image.name}`;
      let index = 0;
      images.forEach((el, i) => {
        if (el.id === image.id) {
          index = i + 1;
        }
      });
      //     const imgTag = `
      //     <p class="ql-align-center"><img src=${imageUrl}></p>
      //     <p class="ql-align-center"><em >${description}</em></p>
      //     <p>&nbsp;</p>
      //  `;
      const imgTag = `[image src=${index} title=${description}]`;

      dispatch(addImage(imgTag));

      setDescription('');
      setShowImageModal(false);
    }
  };

  return (
    <div>
      <Modal
        open={showImageModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Вставить картинку
          </Typography>
          <div className={styles.imageBox}>
            {image && (
              <Image
                className={styles.image}
                src={`${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${image.name}`}
                alt={image.name}
                width={150}
                height={0}
                sizes="100vw"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxHeight: '150px',
                }}
              />
            )}
          </div>
          <TextField
            onChange={changeHandler}
            value={description}
            margin="normal"
            fullWidth
            id="imageDescription"
            label="Подпись к изображению"
            name="description"
            autoFocus
          />
          <button className={styles.button} onClick={addDescriptionHandler}>
            Вставить
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default ImageModal;
