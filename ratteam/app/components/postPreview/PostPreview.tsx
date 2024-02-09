import React from 'react';
import { PostData } from '../../lib/types/response';
import Link from 'next/link';
import styles from './postPreview.module.css';
import ReactHtmlParser from 'html-react-parser';
import { headers } from 'next/headers';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PostLike from '../../ui/postLike/PostLike';
import EditButton from '../EditButton';
import Avatar from '../avatar/Avatar';
import { translit } from '../../lib/translit/translit';
import Image from 'next/image';

export default function PostPreview(post: PostData) {
  const { header, body, user_id, id, PostLikes, Comments, User, Images } = post;

  let firstImage = '';
  if (Images.length > 0) {
    firstImage = Images[0].name;
  }

  const postAuthorTranslit = translit(User.name);
  const postNameTranslit = translit(header);
  const readMoreLink = (
    <Link href={`/blog/${postAuthorTranslit}/${postNameTranslit}/${id}`}>
      <strong>Читать дальше</strong>
    </Link>
  );
  const imagesRegex = /\[image\s+src=(\d+)\s+title=([^\]]*?)\]|<br\s*\/?>/gi;

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      const textWithoutImages = text
        .replace(imagesRegex, '')
        .replace(/<\/?p[^>]*>/g, ' ');

      return (
        <>
          <div style={{ whiteSpace: 'nowrap' }}>
            {ReactHtmlParser(textWithoutImages)}
          </div>
          {readMoreLink}
        </>
      );
    }

    let truncated = text.replace(/<br\s*\/?>/gi, '');

    const matches = truncated.matchAll(imagesRegex);

    for (const match of matches) {
      if (match.index !== undefined && match[0] !== undefined) {
        truncated = truncated.replace(match[0], '');
      }
    }

    truncated =
      truncated.substring(0, maxLength).replace(/<\/?p[^>]*>/g, ' ') + '...';
    return (
      <>
        <div>{ReactHtmlParser(truncated)}</div>
        {readMoreLink}
      </>
    );
  };

  const truncatedBody = truncateText(body, 300);

  const headersList = headers();
  const middlewareSet = headersList.get('user');

  let user = null;

  if (middlewareSet) {
    const decodedUser = Buffer.from(middlewareSet, 'base64').toString('utf-8');
    user = JSON.parse(decodedUser);
  }
  const isOwner = user?.id === user_id;

  return (
    <div className={styles.previewStyle}>
      <Link href={`/blog/${postAuthorTranslit}/${postNameTranslit}/${id}`}>
        <div className={styles.header}>{header}</div>
      </Link>
      {firstImage !== '' && (
        <div className={styles.imageBox}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_HOSTING_URL}${firstImage}`}
            alt="preview"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      )}

      <div>{truncatedBody}</div>
      <div className={styles.previewBottom}>
        <div className={styles.previewBottomLeft}>
          <div className={styles.previewBottomLeftInfo}>
            <PostLike PostLikes={PostLikes} postId={id} />
          </div>
          <div className={styles.previewBottomLeftInfo}>
            <ChatBubbleOutlineIcon />
            <span>{Comments.length}</span>
          </div>
        </div>
        <div className={styles.previewBottomRight}>
          <div className={styles.previewBottomInfo}>
            <div className={styles.previewBottomInfoAvatar}>
              <Avatar user={User} style="comment" />
            </div>
            <span>{User.name}</span>
            {(isOwner || user?.isAdmin) && <EditButton postId={id} />}
          </div>
        </div>
      </div>
    </div>
  );
}
