// RootLayout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import NavBar from './ui/navbar/Navbar';
import { Providers } from './lib/providers';
import Auth from './ui/auth/Auth';
import { headers } from 'next/headers';
import { IUserData } from './lib/types/types';
import Head from 'next/head';
import Footer from './components/footer/Footer';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rat Team',
  description: 'About journeys',
};
// const headersList = headers();
// const middlewareSet = headersList.get('user');
// let user: IUserData;

// if (middlewareSet) {
//   const decodedUser = Buffer.from(middlewareSet, 'base64').toString('utf-8');
//   user = JSON.parse(decodedUser);
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <div>
            <NavBar />
            <Auth />
            <main>{children}</main>
            <footer>
              <Footer />
            </footer>
          </div>
        </body>
      </html>
    </Providers>
  );
}
