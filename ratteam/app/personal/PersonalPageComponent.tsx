import Link from 'next/link';

import React from 'react';
import { headers } from 'next/headers';
import PostPreview from '../components/postPreview/PostPreview';
import styles from './personal.module.css';
import { getUserPosts } from '../lib/data/postData';
import { useAppSelector } from '../lib/redux/hooks';
import { RootState } from '../lib/redux/store';

export default async function PersonalPage() {
  const posts = useAppSelector((state: RootState) => state.postSlice.posts);

  const headersList = headers();
  const middlewareSet = headersList.get('user');
  let user = null;
  if (middlewareSet) {
    const decodedUser = Buffer.from(middlewareSet, 'base64').toString('utf-8');
    user = JSON.parse(decodedUser);
  }
  if (!user.isActivated) {
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
