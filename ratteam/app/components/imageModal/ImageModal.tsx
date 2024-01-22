import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ImageModal({
  showImageModal,
  setShowImageModal,
  file,
  setFile,
}) {
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setShowImageModal(false);
  console.log(
    'image',
    `${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${file?.name}`
  );
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
          <div>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${file?.name}`}
              alt={file?.name}
              width={150}
              height={0}
              sizes="100vw"
              style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '150px',
              }}
              // onLoad={() => {
              //   URL.revokeObjectURL(file.preview);
              // }}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
