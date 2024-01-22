'use client';
import React, { useCallback, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import PostService from '@/app/lib/data/postService';
import axios, { AxiosError } from 'axios';
import { IError } from '@/app/lib/types/response';
import { TextField } from '@mui/material';
import styles from './createPost.module.css';

import dynamic from 'next/dynamic';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import { useRouter } from 'next/navigation';

import Dropzone from '@/app/components/Dropzone';

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
  // imageUploader: {
  //   upload: (file: string | Blob) => {
  //     return new Promise((resolve, reject) => {
  //       try {
  //         const formData = new FormData();
  //         formData.append('image', file);

  //         fetch(
  //           'https://api.imgbb.com/1/upload?key=e1a48b3cfa8eb4ffab49dc2cc8ce0543',
  //           {
  //             method: 'POST',
  //             body: formData,
  //           }
  //         )
  //           .then((response) => response.json())
  //           .then((result) => {
  //             console.log('result.data.url', result.data.url);
  //             resolve(result.data.url);
  //           })
  //           .catch((error) => {
  //             reject('Upload failed');
  //             console.error('Error:', error);
  //           });
  //       } catch (error) {
  //         reject('Error processing file');
  //         console.error('Error:', error);
  //       }
  //     });
  //   },
  // },
  // imageCompress: {
  //   quality: 0.7, // default
  //   maxWidth: 'auto', // default
  //   maxHeight: 'auto', // default
  //   imageType: 'image/jpeg/png', // default
  //   debug: true, // default
  // },
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
    // const { default: ImageUploader } = require('quill-image-uploader');
    // const { default: ImageCompress } = require('quill-image-compress');
    // if (RQ.Quill && ImageUploader && ImageCompress) {
    //   RQ.Quill.register('modules/imageUploader', ImageUploader);
    //   // RQ.Quill.register('modules/imageCompress', ImageCompress);
    // }
    return RQ;
  },
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

export default function CreatePost() {
  const [body, setBody] = useState('');
  console.log('body', body);
  const [postHeader, setPostHeader] = useState('');
  const [image, setImage] = useState('');

  const router = useRouter();

  const handleEditorChange = useCallback((newContent: string) => {
    setBody(newContent);
  }, []);

  const handleSave = async () => {
    if (postHeader.length === 0) {
    }
    try {
      const postData = {
        header: postHeader,
        body: body,
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
          className={styles.textField}
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
          value={body}
          onChange={handleEditorChange}
          modules={quillModules}
          formats={quillFormats}
        />
      </div>
      <div className={styles.box}>
        <h2 className={styles.header}>Фотографии</h2>
        <Dropzone setBody={setBody} />
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
