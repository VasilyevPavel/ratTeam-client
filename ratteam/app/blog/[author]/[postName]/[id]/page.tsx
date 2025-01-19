import React from 'react';
import { getAllPosts, getOnePost } from '@/app/lib/data/postData';

import './postStyles.css';
import OnePost from '@/app/components/onePost/OnePost';
import { unstable_cache } from 'next/cache';

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return (
    posts?.map((post) => ({
      author: post.User.name,
      post: post.header,
      id: post.id.toString(),
    })) || []
  );
}
export default async function Page({
  params,
}: {
  params: Promise<{ author: string; postName: string; id: string }>;
}) {
  const { id, author, postName } = await params;
  const getCachedPost = unstable_cache(
    async (id: number) => {
      return getOnePost(id);
    },
    [`post-${id}`],
    {
      tags: [`post-${id}`, 'comments'],
    }
  );
  const post = await getCachedPost(+id);

  if (post) {
    return <OnePost post={post} author={author} postName={postName} />;
  } else {
    <div>Упс...</div>;
  }
}
