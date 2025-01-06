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
import React, { useEffect, useState } from 'react';

export default function Page() {
  const id = useAppSelector((state: RootState) => state.postSlice.id);
  const postBody = useAppSelector((state: RootState) => state.postSlice.body);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  console.log('isLoading', isLoading);
  console.log('postBody', postBody);
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await PostService.getOnePost(+id);
          const post: PostData = await response.data;
          dispatch(setPostHeader(post.header));
          dispatch(setPostBody(post.body));
          dispatch(setImages(post.PostImages));
          setIsLoading(false);
        } catch (error) {
          const err = error as AxiosError<IError>;
          console.log(err.response?.data?.message);
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [id, dispatch]);

  if (isLoading || !postBody) {
    return <div>Загрузка...</div>;
  }

  return <CreatePost />;
}
