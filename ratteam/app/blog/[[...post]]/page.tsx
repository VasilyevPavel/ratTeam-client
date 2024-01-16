import React from 'react';
import { getOnePost } from '@/app/lib/data/postData';
import ReactHtmlParser from 'html-react-parser';

export default async function page({ params }: { params: { post: string[] } }) {
  console.log('post!!!""""', params);
  const [, , postId] = params.post.map(Number);
  const post = await getOnePost(postId);
  console.log('onePost', post);
  if (!post) {
    <div>'Произошла ошибка'</div>;
  } else {
    return (
      <>
        <div>{ReactHtmlParser(post.header)}</div>
        <div>{ReactHtmlParser(post.body)}</div>
      </>
    );
  }
}
