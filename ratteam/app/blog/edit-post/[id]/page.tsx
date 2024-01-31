'use client';
import CreatePost from '@/app/components/createPost/CreatePost';
import PostService from '@/app/lib/data/postService';
import { useAppDispatch } from '@/app/lib/redux/hooks';
import {
  setPostBody,
  setPostHeader,
  setPostId,
} from '@/app/lib/redux/postSlice';
import { IError, PostData } from '@/app/lib/types/response';
import { AxiosError } from 'axios';
import React, { useEffect } from 'react';

export default function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  const dispatch = useAppDispatch();
  dispatch(setPostId(+id));

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await PostService.getOnePost(+id);
          const post: PostData = await response.data;

          dispatch(setPostHeader(post.header));
          dispatch(setPostBody(post.body));
        } catch (error) {
          const err = error as AxiosError<IError>;
          console.log(err.response?.data?.message);
        }
      }
    };

    fetchData();
  }, [id]);

  return <CreatePost />;
}
