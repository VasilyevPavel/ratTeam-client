'use client';
import React, { ChangeEvent, useState } from 'react';
import Avatar from '../../avatar/Avatar';
import Image from 'next/image';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { uploadCommentPhoto } from '@/app/lib/data/imageData';

import { useRouter } from 'next/navigation';
import { saveComment } from '@/app/lib/data/commentData';

export default function AddMainComment({ postId }) {
  const [text, setText] = useState('');
  const [commentPhotoName, setCommentPhotoName] = useState<string | null>(null);
  const [commentPhotoId, setCommentPhotoId] = useState<number | null>(null);

  console.log('commentPhotoName', commentPhotoName);

  const router = useRouter();

  const handleMainFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log('коммент');

    const file = e.target.files?.[0];
    console.log('file', file);
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      const response = await uploadCommentPhoto(formData);
      console.log('response', response);
      if (response) {
        setCommentPhotoName(response.data.name);
        setCommentPhotoId(response.data.id);
      }
    }
  };

  const saveCommentHandler = () => {
    if (text.trim().length > 0 || commentPhotoId) {
      saveComment(postId, text, commentPhotoId);

      setText('');
      setTimeout(() => {
        router.refresh();

        setCommentPhotoName(null);
        setCommentPhotoId(null);
      }, 0);
    }
  };

  return (
    <div className="comments-form">
      <div className="comment-control">
        <Avatar />

        <textarea
          className="textField"
          placeholder="Введите комментарий"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div className="controls">
          <input
            onClick={() => console.log('коммент')}
            accept="image/*"
            style={{ display: 'none' }}
            id="main-raised-button-file"
            type="file"
            onChange={handleMainFileUpload}
          />
          {commentPhotoName ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${commentPhotoName}`}
              alt="comment image"
              width={50}
              height={50}
              sizes="100vw"
            />
          ) : (
            <label htmlFor="main-raised-button-file">
              <AddAPhotoIcon sx={{ fontSize: '40px', cursor: 'pointer' }} />
            </label>
          )}

          <button className="comment-btn" onClick={saveCommentHandler}>
            Отправить{' '}
          </button>
        </div>
      </div>
    </div>
  );
}
