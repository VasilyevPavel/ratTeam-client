import React from 'react';
import { PostData } from '../lib/types/response';

export default function Post({ header, body }: PostData) {
  return (
    <div style={{ border: 'solid 3px black' }}>
      <div>{header}</div>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}
