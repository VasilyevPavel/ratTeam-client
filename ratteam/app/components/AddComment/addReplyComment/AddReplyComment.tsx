'use client';
import { Zoom } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import Avatar from '../../avatar/Avatar';
import Image from 'next/image';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import { RootState } from '@/app/lib/redux/store';
import { uploadCommentPhoto } from '@/app/lib/data/imageData';
import { saveComment } from '@/app/lib/data/commentData';
import { useRouter } from 'next/navigation';
import { setShowReplayWindow } from '@/app/lib/redux/commentSlice';

interface IAddReplyComment {
  commentId: number;
  postId: number;
}

export default function AddReplyComment({
  commentId,
  postId,
}: IAddReplyComment) {
  const [text, setText] = useState('');
  const [commentReplyName, setCommentReplyName] = useState<string | null>(null);
  const [commentReplyId, setCommentReplyId] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const userData = useAppSelector(
    (state: RootState) => state.userSlice.userData
  );
  const showReplayWindow = useAppSelector(
    (state: RootState) => state.commentSlice.showReplayWindow
  );

  const handleReplyFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append('photo', file);
      const response = await uploadCommentPhoto(formData);

      if (response) {
        setCommentReplyName(response.data.name);
        setCommentReplyId(response.data.id);
      }
    }
  };

  const saveCommentHandler = () => {
    if (text.trim().length > 0 || commentReplyId) {
      saveComment(postId, text, commentReplyId, commentId);

      setText('');
      setTimeout(() => {
        router.refresh();
        dispatch(setShowReplayWindow(null));

        setCommentReplyName(null);
        setCommentReplyId(null);
      }, 0);
    }
  };

  return (
    <>
      {userData && showReplayWindow && (
        <Zoom in={showReplayWindow === commentId} timeout={300} unmountOnExit>
          <div className="comments-form.show">
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
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="reply-raised-button-file"
                  type="file"
                  onChange={handleReplyFileUpload}
                />
                {commentReplyName ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${commentReplyName}`}
                    alt="comment image"
                    width={50}
                    height={50}
                    sizes="100vw"
                  />
                ) : (
                  <label htmlFor="reply-raised-button-file">
                    <AddAPhotoIcon
                      sx={{ fontSize: '40px', cursor: 'pointer' }}
                    />
                  </label>
                )}

                <button className="comment-btn" onClick={saveCommentHandler}>
                  Отправить{' '}
                </button>
              </div>
            </div>
          </div>
        </Zoom>
      )}
    </>
  );
}
