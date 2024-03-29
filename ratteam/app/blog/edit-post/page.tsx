'use client';
import CreatePost from '@/app/components/createPost/CreatePost';
import PostService from '@/app/lib/data/postService';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import {
  setImages,
  setPostBody,
  setPostHeader,
  setPostId,
} from '@/app/lib/redux/postSlice';
import { RootState } from '@/app/lib/redux/store';
import { IError, PostData } from '@/app/lib/types/response';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';

export default function Page() {
  const id = useAppSelector((state: RootState) => state.postSlice.id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await PostService.getOnePost(+id);
          const post: PostData = await response.data;

          dispatch(setPostHeader(post.header));
          dispatch(setPostBody(post.body));
          dispatch(setImages(post.PostImages));
        } catch (error) {
          const err = error as AxiosError<IError>;
          console.log(err.response?.data?.message);
        }
      }
    };

    fetchData();
  }, [id, dispatch]);

  return <CreatePost />;
}
