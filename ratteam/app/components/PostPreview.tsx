import React from 'react';
import { PostData } from '../lib/types/response';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import styles from './postPreview.module.css';

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.substring(0, maxLength) + '...';
  const readMoreLink = (
    <Link href="/">
      <strong>Читать дальше</strong>
    </Link>
  );

  return (
    <>
      {truncated} {readMoreLink}
    </>
  );
};

export default function PostPreview({ header, body }: PostData) {
  console.log('body', body);
  const clean = DOMPurify.sanitize(body);
  const truncatedBody = truncateText(clean, 300);

  return (
    <div className={styles.previewStyle}>
      <div>{header}</div>
      <div>{truncatedBody}</div>
    </div>
  );
}
