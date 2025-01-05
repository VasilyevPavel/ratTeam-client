'use client';
import React, { useCallback, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import PostService from '@/app/lib/data/postService';
import { AxiosError } from 'axios';
import { IError } from '@/app/lib/types/response';
import { TextField } from '@mui/material';
import styles from './createPost.module.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Dropzone from '@/app/components/dropzone/Dropzone';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import {
  resetPostData,
  setCursorPosition,
  setPostBody,
  setPostHeader,
} from '@/app/lib/redux/postSlice';
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
    const quillModule = await import('react-quill');
    const RQ = quillModule.default || module;

    return RQ;
  },
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

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
    (newContent: string, delta: any, source: any, editor: any) => {
      const cursorPosition = editor.getSelection()?.index;
      if (cursorPosition !== null) {
        // Сохраняем положение курсора в Redux
        dispatch(setCursorPosition(cursorPosition));
      }
      const doc = new DOMParser().parseFromString(newContent, 'text/html');
      const imgElements = doc.querySelectorAll('img[src]');

      if (imgElements.length > 0) {
        imgElements.forEach((img) => {
          const srcAttribute = img.getAttribute('src');
          if (
            !srcAttribute ||
            !srcAttribute.startsWith(
              `${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}`
            )
          ) {
            const comment = doc.createComment(img.outerHTML);
            img.replaceWith(comment);
          }
        });

        const clearedHtml = doc.body.innerHTML;

        dispatch(setPostBody(clearedHtml));
      } else {
        dispatch(setPostBody(newContent));
      }
    },

    [dispatch]
  );

  const handleSelectionChange = (range: any, source: string, editor: any) => {
    // Если курсор перемещается, мы обновляем его позицию
    if (range) {
      const cursorPosition = range.index; // Получаем индекс курсора
      dispatch(setCursorPosition(cursorPosition)); // Сохраняем в Redux
    }
  };

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
      } else {
        const post = await PostService.create(postData);
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
        <QuillNoSSRWrapper
          placeholder="Start typing!"
          value={postBody}
          onChange={handleEditorChange}
          onChangeSelection={handleSelectionChange}
          modules={quillModules}
          formats={quillFormats}
        />
      </div>
      <div className={styles.box}>
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
