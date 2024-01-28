import React from 'react';
import { getOnePost } from '@/app/lib/data/postData';
import { Element } from 'html-react-parser';
const parse = require('html-react-parser').default;
import './postStyles.css';

import Image from 'next/image';

export default async function page({ params }: { params: { post: string[] } }) {
  const [, , postId] = params.post.map(Number);

  const post = await getOnePost(postId);

  if (!post) {
    return <div>Произошла ошибка</div>;
  } else {
    const options = {
      replace: (domNode: Element) => {
        if (domNode.name === 'img' || domNode.name === 'Image') {
          const { src, alt, width, height } = domNode.attribs;
          return (
            <Image
              className="imageStyle"
              src={src}
              alt={post.header}
              width={0}
              height={0}
              sizes="100vw"
            />
          );
        }
        return domNode;
      },
    };

    return (
      <>
        <h1 className="postHeader">{post.header}</h1>
        <div className="postBody">{parse(post.body, options)}</div>
      </>
    );
  }
}
