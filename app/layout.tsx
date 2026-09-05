import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anton Trantin — Digital Craftsman',
  description: 'Digital craftsman, engineer, entrepreneur, and angel investor. Building software, products, and sometimes companies—for the joy of making.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
