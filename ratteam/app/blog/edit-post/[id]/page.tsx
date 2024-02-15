'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import CreatePost from '@/app/components/createPost/CreatePost';
import PostService from '@/app/lib/data/postService';
import { useAppDispatch } from '@/app/lib/redux/hooks';
import {
  setImages,
  setPostBody,
  setPostHeader,
  setPostId,
} from '@/app/lib/redux/postSlice';
import { IError, PostData } from '@/app/lib/types/response';
import { AxiosError } from 'axios';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useAppDispatch();
  if (id) {
    dispatch(setPostId(+id));
  }

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
};

export default Page;
