'use client';
import React, { useCallback, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import PostService from '@/app/lib/data/postService';
import { AxiosError } from 'axios';
import { IError } from '@/app/lib/types/response';
import { TextField } from '@mui/material';
import styles from './createPost.module.css';

import dynamic from 'next/dynamic';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import { useRouter } from 'next/navigation';

import Dropzone from '@/app/components/dropzone/Dropzone';
import { Dispatch } from 'redux';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import postSlice, { setPostBody } from '@/app/lib/redux/postSlice';
import { RootState } from '@/app/lib/redux/store';

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    // ['link', 'image'],

    ['link'],
    [{ align: [] }],
    [{ color: [] }],
    ['code-block'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'align',
  'color',
  'code-block',
];

const QuillNoSSRWrapper = dynamic(
  async () => {
    const module = await import('react-quill');
    const RQ = module.default || module;

    return RQ;
  },
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

export default function CreatePost() {
  const [postHeader, setPostHeader] = useState('');
  const [isPostheaderFilled, setIsPostHeaderFilled] = useState<boolean>(true);
  const postBody = useAppSelector((state: RootState) => state.postSlice.body);
  console.log('postBody', postBody);
  const router = useRouter();

  const postHeaderInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleEditorChange = useCallback((newContent: string) => {
    dispatch(setPostBody(newContent));
  }, []);

  const handleSave = async () => {
    if (postHeader.length === 0) {
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
      };
      const response = await PostService.create(postData);
      router.push('/personal');
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
          onChange={(e) => setPostHeader(e.target.value)}
        />
        <QuillNoSSRWrapper
          placeholder="Start typing!"
          value={postBody}
          onChange={handleEditorChange}
          modules={quillModules}
          formats={quillFormats}
        />
      </div>
      <div className={styles.box}>
        <h2 className={styles.header}>Фотографии</h2>
        <Dropzone />
      </div>
      <div className={styles.buttonsBlock}>
        <button onClick={handleSave} className={styles.button}>
          Сохранить пост
        </button>
        <button onClick={handleSave} className={styles.button}>
          Опубликовать пост
        </button>
      </div>
    </main>
  );
}
