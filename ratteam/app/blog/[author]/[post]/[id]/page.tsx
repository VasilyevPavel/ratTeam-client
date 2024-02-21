import React from 'react';
import { getAllPosts, getOnePost } from '@/app/lib/data/postData';
import { Element } from 'html-react-parser';
import Image from 'next/image';
import EditButton from '@/app/components/EditButton';
import Comments from '@/app/components/comments/Comments';
import Likes from '@/app/ui/likes/Likes';
import './postStyles.css';

const parse = require('html-react-parser').default;

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
  params: { author: string; post: string; id: string };
}) {
  const { id } = params;

  const post = await getOnePost(+id);
  const images = post?.PostImages;
  if (post) {
    const text = post.body;

    const regex = /\[image\s+src=(\d+)\s+title=([^\]]*?)\]/g;
    const bodyWithImgTags = text.replace(regex, (_, index, title) => {
      const src =
        images && images.length === 1 ? images[0] : images?.[index - 1];

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
        </div>

        <div className="postBody">{parse(bodyWithImgTags, options)}</div>
        <div className="postControl">
          <EditButton postId={post.id} userId={post.User.id} />
          <Likes allLikes={post.PostLikes} id={post.id} />
        </div>
        <Comments postId={post.id} comments={post.Comments} />
      </>
    );
  } else {
    return <div>Произошла ошибка</div>;
  }
}