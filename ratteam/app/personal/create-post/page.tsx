'use client';
import React, { useCallback, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import PostService from '@/app/lib/data/postService';
import { AxiosError } from 'axios';
import { IError } from '@/app/lib/types/response';
import { TextField } from '@mui/material';

import dynamic from 'next/dynamic';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    [{ align: [] }],
    [{ color: [] }],
    ['code-block'],
    ['clean'],
  ],
  imageUploader: {
    upload: (file: string | Blob) => {
      return new Promise((resolve, reject) => {
        try {
          const formData = new FormData();
          formData.append('image', file);

          fetch(
            'https://api.imgbb.com/1/upload?key=334ecea9ec1213784db5cb9a14dac265',
            {
              method: 'POST',
              body: formData,
            }
          )
            .then((response) => response.json())
            .then((result) => {
              resolve(result.data.url);
            })
            .catch((error) => {
              reject('Upload failed');
              console.error('Error:', error);
            });
        } catch (error) {
          reject('Error processing file');
          console.error('Error:', error);
        }
      });
    },
  },
  imageCompress: {
    quality: 0.7, // default
    maxWidth: 'auto', // default
    maxHeight: 'auto', // default
    imageType: 'image/jpeg', // default
    debug: true, // default
  },
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
    const { default: ImageUploader } = require('quill-image-uploader');
    const { default: ImageCompress } = require('quill-image-compress');
    if (RQ.Quill && ImageUploader && ImageCompress) {
      RQ.Quill.register('modules/imageUploader', ImageUploader);
      RQ.Quill.register('modules/imageCompress', ImageCompress);
    }
    return RQ;
  },
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

export default function CreatePost() {
  const [body, setBody] = useState('');
  const [postHeader, setPostHeader] = useState('');

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
    } catch (error) {
      const err = error as AxiosError<IError>;
      console.log(err.response?.data.message);
    }
  };

  return (
    <main>
      <div className="h-screen w-screen flex items-center flex-col">
        <div className="h-full w-[90vw]">
          <div>Выбери название для поста</div>
          <TextField
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
            className="w-full h-[60%] mt-10 bg-white"
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Сохранить пост
      </button>
    </main>
  );
}
