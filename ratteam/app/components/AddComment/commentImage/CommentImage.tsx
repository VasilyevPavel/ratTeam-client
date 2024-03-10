import React, { ChangeEvent, Suspense } from 'react';
import Image from 'next/image';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { CircularProgress } from '@mui/material';
import ImageComponent from './ImageComponent';

interface CommentImageProps {
  commentPhotoName?: string | null;
  commentPhotoReplyName?: string | null;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  loadingPhoto: boolean;
  setCommentPhotoName: (value: string | null) => void;
  setCommentPhotoReplyName: (value: string | null) => void;
  commentPhotoId: number | null;
  isReply?: boolean;
}

export default function CommentImage({
  commentPhotoName,
  commentPhotoReplyName,
  handleFileUpload,
  loadingPhoto,
  isReply,
  setCommentPhotoName,
  setCommentPhotoReplyName,
  commentPhotoId,
}: CommentImageProps) {
  const photoUrl = isReply ? commentPhotoReplyName : commentPhotoName;

  const inputId = isReply
    ? 'reply-raised-button-file'
    : 'main-raised-button-file';

  return (
    <div className="controls">
      {loadingPhoto ? (
        <CircularProgress />
      ) : (
        <>
          {photoUrl ? (
            <ImageComponent
              photoUrl={photoUrl}
              handleFileUpload={handleFileUpload}
              setCommentPhotoName={setCommentPhotoName}
              setCommentPhotoReplyName={setCommentPhotoReplyName}
              commentPhotoId={commentPhotoId}
            />
          ) : (
            <label htmlFor={inputId}>
              {' '}
              <AddAPhotoIcon sx={{ fontSize: '40px', cursor: 'pointer' }} />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id={inputId}
                type="file"
                onChange={handleFileUpload}
              />
            </label>
          )}
        </>
      )}

      <button className="comment-btn" type="submit">
        Отправить
      </button>
    </div>
  );
}
