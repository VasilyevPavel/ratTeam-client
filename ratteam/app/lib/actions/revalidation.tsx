'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function revalidationPath(path: string) {
  console.log('ревалидация');
  revalidatePath(path);
  // revalidateTag(tag);

  // res.status(200).json({ message: 'Path revalidated' });
}
export async function revalidationTag(tag: string) {
  console.log('ревалидация tag', tag);
  revalidatePath('/', 'layout');

  // revalidateTag(tag);
  // revalidateTag(tag);

  // res.status(200).json({ message: 'Path revalidated' });
}
