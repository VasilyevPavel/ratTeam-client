'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Modal from '@mui/material/Modal';

interface CommentImageModalProps {
  src: string;
  alt: string;
}

const CommentImageModal: React.FC<CommentImageModalProps> = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        sizes="100vw"
        style={{
          height: 'auto',
          maxHeight: '150px',
          cursor: 'pointer',
        }}
        onClick={handleOpen}
      />
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          outline: 'none',
        }}
      >
        <div
          style={{
            outline: 'none',
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={800}
            height={800}
            onClick={handleClose}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              cursor: 'pointer',
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default CommentImageModal;
