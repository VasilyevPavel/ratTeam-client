'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export default async function revalidationPath(tag: string) {
  console.log('ревалидация');
  // revalidatePath(path, 'page');
  revalidateTag(tag);

  // res.status(200).json({ message: 'Path revalidated' });
}
