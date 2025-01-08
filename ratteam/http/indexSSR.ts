'use server';
import { cookies } from 'next/headers';

export async function serverCookie() {
  return (await cookies()).get('refreshToken')?.value;
}
export async function setCookie(name: string, value: string) {
  return (await cookies()).set(name, value);
}
