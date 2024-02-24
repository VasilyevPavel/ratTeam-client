'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import PostPreview from '../components/postPreview/PostPreview';
import styles from './personal.module.css';

import { PostData } from '../lib/types/response';
import { useAppSelector } from '../lib/redux/hooks';
import { RootState } from '../lib/redux/store';
import PostService from '../lib/data/postService';

export default function PersonalPage() {
  // const posts = await getUserPosts();
  const user = useAppSelector((state: RootState) => state.userSlice.userData);

  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (user?.user?.id) {
          const response = await PostService.getUserPosts(user?.user?.id);
          if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const posts: PostData[] = await response.data;
          if (posts) {
            setPosts(posts);
          }
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [posts, user]);

  if (!user?.user.isActivated) {
    return <div>Активируйте свой профиль в почте</div>;
  }
  return (
    <>
      <div className={styles.posts}>
        {posts && posts.length > 0 ? (
          <>
            <Link href="/personal/create-post">
              <div>Создать пост</div>
            </Link>
            {posts.map((post) => (
              <PostPreview key={post.id} {...post} />
            ))}
          </>
        ) : (
          <Link href="/personal/create-post">
            <div>Напиши свой первый пост</div>
          </Link>
        )}
      </div>
    </>
  );
}
