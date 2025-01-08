import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';

import NavBar from './ui/navbar/Navbar';
import { Providers } from './lib/providers';
import Auth from './ui/auth/Auth';

import Footer from './components/footer/Footer';
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: 'Rat Team',
  description: 'About journeys',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={robotoMono.variable}>
          <div>
            <NavBar />
            <Auth />
            <main className="main">{children}</main>
            <footer>
              <Footer />
            </footer>
          </div>
        </body>
      </html>
    </Providers>
  );
}
