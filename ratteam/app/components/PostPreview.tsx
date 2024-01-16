import React from 'react';
import { PostData } from '../lib/types/response';
import Link from 'next/link';
import styles from './postPreview.module.css';
import ReactHtmlParser from 'html-react-parser';
import { headers } from 'next/headers';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PostLike from '../ui/postLike/PostLike';
import EditButton from './EditButton';
import Avatar from './Avatar';
import { translit } from '../lib/translit/translit';

const extractFirstImage = (text: string) => {
  const firstImage = text.match(/<img [^>]*src="([^"]+)"[^>]*>/);
  return firstImage ? firstImage[0] : '';
};

export default function PostPreview({
  header,
  body,
  user_id,
  id,
  PostLikes,
  Comments,
  User,
}: PostData) {
  const firstImage = extractFirstImage(body);
  const postAuthorTranslit = translit(User.name);
  const postNameTranslit = translit(header);
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return <div>{ReactHtmlParser(text)}</div>;
    }

    const truncated = text.substring(0, maxLength) + '...';
    const readMoreLink = (
      <Link href={`/blog/${postAuthorTranslit}/${postNameTranslit}/${id}`}>
        <strong>Читать дальше</strong>
      </Link>
    );

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
      <div className={styles.imageContainer}>
        <div className={styles.imagePreviewContainer}>
          {ReactHtmlParser(firstImage)}
        </div>
      </div>
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
              <Avatar user={User} />
            </div>
            <span>{User.name}</span>
            {(isOwner || user?.isAdmin) && <EditButton />}
          </div>
        </div>
      </div>
    </div>
  );
}
