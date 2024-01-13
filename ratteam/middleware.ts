import { NextResponse } from 'next/server';

export default async function middleware(req: {
  headers: HeadersInit | undefined;
  cookies: { get: (arg0: string) => any };
  nextUrl: { pathname: string };
  url: string | URL | undefined;
}) {
  const loggedin = req.cookies.get('refreshToken') ?? { value: null };

  const { pathname } = req.nextUrl;

  const token = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/auth/get-user`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { Cookie: `refreshToken=${loggedin.value}` },
        }
      );
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  };

  if (loggedin.value) {
    const result = await token();
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

  if (!loggedin && pathname.startsWith('/personal')) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}
