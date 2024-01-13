import Link from 'next/link';
import React from 'react';
import PostService from '../lib/data/postService';
import { AxiosError } from 'axios';
import { IError, PostData } from '../lib/types/response';
import { revalidateTag } from 'next/cache';
import { revalidatePath } from 'next/cache';
import { cookies, headers } from 'next/headers';
import PostPreview from '../components/PostPreview';
import styles from './personal.module.css';
async function getData() {
  try {
    const headersList = headers();
    const middlewareSet = headersList.get('user');
    let user = null;
    if (middlewareSet) {
      const decodedUser = Buffer.from(middlewareSet, 'base64').toString(
        'utf-8'
      );
      user = JSON.parse(decodedUser);
    }

    if (user) {
      const response = await PostService.getUserPosts(user.id);
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
      <div className={styles.posts}>
        {posts ? (
          posts.map((post) => <PostPreview key={post.id} {...post} />)
        ) : (
          <Link href="/personal/create-post">
            <div>Напиши свой первый пост</div>
          </Link>
        )}
      </div>
    </>
  );
}
