'use client';
import React, { useCallback, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import PostService from '@/app/lib/data/postService';
import { AxiosError } from 'axios';
import { IError } from '@/app/lib/types/response';
import { TextField } from '@mui/material';
import styles from './createPost.module.css';
import { useRouter } from 'next/navigation';
import Dropzone from '@/app/components/dropzone/Dropzone';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import {
  resetPostData,
  setPostBody,
  setPostHeader,
} from '@/app/lib/redux/postSlice';
import { RootState } from '@/app/lib/redux/store';
import RichTextEditor from '../draft/Draft';
import { revalidationTag } from '@/app/lib/actions/revalidation';

export default function CreatePost() {
  const postId = useAppSelector((state: RootState) => state.postSlice.id);
  const [isPostheaderFilled, setIsPostHeaderFilled] = useState<boolean>(true);
  const postHeader = useAppSelector(
    (state: RootState) => state.postSlice.header
  );
  const images = useAppSelector((state: RootState) => state.postSlice.images);
  const postBody = useAppSelector((state: RootState) => state.postSlice.body);
  const router = useRouter();

  const postHeaderInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleEditorChange = useCallback(
    (newContent: string) => {
      dispatch(setPostBody(newContent));
    },

    [dispatch]
  );

  const handleSave = async (isPosted: boolean) => {
    if (postHeader.length === 0 || postHeader.trim() === '') {
      setIsPostHeaderFilled(false);
      if (postHeaderInputRef.current) {
        postHeaderInputRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
      setTimeout(() => {
        setIsPostHeaderFilled(true);
      }, 1500);
      return;
    }
    try {
      const postData = {
        header: postHeader,
        body: postBody,
        isPosted: isPosted,
        images,
      };
      if (postId) {
        const post = await PostService.update(postId, postData);
        const tag = 'posts';
        revalidationTag(tag);
      } else {
        const post = await PostService.create(postData);
        const tag = 'posts';

        revalidationTag(tag);
      }
      dispatch(resetPostData());
      router.push('/personal');
      setTimeout(() => {
        router.refresh();
      }, 0);
    } catch (error) {
      const err = error as AxiosError<IError>;
      console.log(err.response?.data.message);
    }
  };
  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <div className={styles.input}>Выбери название для поста</div>
        <TextField
          inputRef={postHeaderInputRef}
          className={`${styles.textField} ${
            !isPostheaderFilled ? styles.alert : ''
          }`}
          fullWidth
          type="text"
          required
          autoFocus
          label="Название поста"
          value={postHeader}
          onChange={(e) => dispatch(setPostHeader(e.target.value))}
        />
        <RichTextEditor onChange={handleEditorChange} />
      </div>
      <div className={styles.photosBox}>
        <h2 className={styles.header}>Фотографии</h2>
        <Dropzone />
      </div>
      <div className={styles.buttonsBlock}>
        <button
          onClick={() => {
            const isPosted = false;
            handleSave(isPosted);
          }}
          className={styles.button}
        >
          Сохранить пост в черновиках
        </button>
        <button
          onClick={() => {
            const isPosted = true;

            handleSave(isPosted);
          }}
          className={styles.button}
        >
          Опубликовать пост
        </button>
      </div>
    </main>
  );
}
