import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

export default async function middleware(
  req: {
    headers: HeadersInit | undefined;
    cookies: { get: (arg0: string) => any };
    nextUrl: { pathname: string };
    url: string | URL | undefined;
  },
  event: NextFetchEvent
) {
  const loggedin = req.cookies.get('refreshToken') ?? { value: null };

  const { pathname } = req.nextUrl;

  event.waitUntil(fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/login`));

  const token = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/auth/get-user`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { Cookie: `refreshToken=${loggedin.value || ''}` },
        }
      );
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Ошибка при получении токена:', error);
      return null;
    }
  };

  if (loggedin.value) {
    const result = await token();

    if (result && result.user) {
      const user = JSON.stringify(result.user);
      const encodedUser = Buffer.from(user).toString('base64');

      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('user', encodedUser);

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      return response;
    }
  }

  if (
    !loggedin.value &&
    (pathname.startsWith('/personal') || pathname.startsWith('/blog/edit-post'))
  ) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}
