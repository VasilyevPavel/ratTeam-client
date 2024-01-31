import React from 'react';
import { getOnePost } from '@/app/lib/data/postData';
import { Element } from 'html-react-parser';
const parse = require('html-react-parser').default;
import './postStyles.css';

import Image from 'next/image';
import EditButton from '@/app/components/EditButton';

export default async function page({ params }: { params: { post: string[] } }) {
  const [, , postId] = params.post.map(Number);

  const post = await getOnePost(postId);
  const images = post?.Images;
  if (post) {
    const text = post.body;
    const regex = /\[image\s+src=(\d+)\s+title=([^\]]*?)\]/g;
    const bodyWithImgTags = text.replace(regex, (_, index, title) => {
      const src = images && images[index - 1];

      return src
        ? `<img src="${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${src.name}" alt="${title}" />`
        : '';
    });

    const options = {
      replace: (domNode: Element) => {
        if (domNode.name === 'img') {
          const elementNode = domNode as Element;

          if (elementNode.parent) {
            const parentNode = elementNode.parent as Element;
            parentNode.name = 'div';
          }

          const { src, alt, width, height } = elementNode.attribs;
          return (
            <div className="imageContainer">
              <Image
                className="imageStyle ql-align-center"
                src={src}
                alt={post.header}
                width={0}
                height={0}
                sizes="100vw"
              />
              <em>{alt}</em>
            </div>
          );
        }
        return domNode;
      },
    };

    return (
      <>
        <div className="postHeaderBox">
          <h1 className="postHeader">{post.header}</h1>
          <EditButton postId={postId} />
        </div>
        <div className="postBody">{parse(bodyWithImgTags, options)}</div>
      </>
    );
  } else {
    return <div>Произошла ошибка</div>;
  }
}
