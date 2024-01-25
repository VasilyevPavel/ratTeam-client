import React from 'react';
import { PostData } from '../../lib/types/response';
import Link from 'next/link';
import styles from './postPreview.module.css';
import ReactHtmlParser from 'html-react-parser';
import { headers } from 'next/headers';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PostLike from '../../ui/postLike/PostLike';
import EditButton from '../EditButton';
import Avatar from '../Avatar';
import { translit } from '../../lib/translit/translit';
import Image from 'next/image';

const extractFirstImage = (text: string) => {
  const imageRegex = /<img [^>]*src="([^"]+)"[^>]*>/;
  const firstImage = text.match(imageRegex);
  let textForPreview = '';

  if (firstImage) {
    textForPreview = text.replace(imageRegex, '');
  }

  return firstImage
    ? {
        firstImage: firstImage[1],
        textForPreview: textForPreview.trim(),
      }
    : {
        textForPreview: text.trim(),
      };
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
  console.log('firstImagefirstImagefirstImage', firstImage);
  const postAuthorTranslit = translit(User.name);
  const postNameTranslit = translit(header);
  const readMoreLink = (
    <Link href={`/blog/${postAuthorTranslit}/${postNameTranslit}/${id}`}>
      <strong>Читать дальше</strong>
    </Link>
  );

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return (
        <>
          <div>{ReactHtmlParser(text)}</div>
          {readMoreLink}
        </>
      );
    }

    const truncated = text.substring(0, maxLength) + '...';

    return (
      <>
        <div>{truncated}</div>
        {readMoreLink}
      </>
    );
  };

  const truncatedBody = truncateText(firstImage.textForPreview, 300);

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
      {firstImage && (
        <Image
          src={firstImage.firstImage}
          alt="preview"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      )}
      {/* </div> */}
      {/* </div> */}
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
