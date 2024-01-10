import Link from 'next/link';
import React from 'react';
import PostService from '../lib/data/postService';
import { AxiosError } from 'axios';
import { IError, PostData } from '../lib/types/response';
import { revalidateTag } from 'next/cache';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import Post from '../components/Post';
async function getData() {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken');

    if (refreshToken) {
      const response = await PostService.getPosts(refreshToken.value);
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: PostData[] = await response.data;
      return data;
    }
  } catch (error) {
    const err = error as AxiosError<IError>;

    console.log(err.response?.data?.message);
  }
}

export default async function PersonalPage() {
  const posts = await getData();

  console.log('posts1111', posts);
  return (
    <>
      <Link href="/personal/create-post">
        <div>Создать пост</div>
      </Link>
      {posts ? (
        posts.map((post) => <Post key={post.id} {...post} />)
      ) : (
        <Link href="/personal/create-post">
          <div>Напиши свой первый пост</div>
        </Link>
      )}
    </>
  );
}
