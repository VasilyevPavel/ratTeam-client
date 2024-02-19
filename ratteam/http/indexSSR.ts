'use server';
import { cookies } from 'next/headers';

export async function serverCookie() {
  return cookies().get('refreshToken')?.value;
}
export async function setCookie(name: string, value: string) {
  return cookies().set(name, value);
}
