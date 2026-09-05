import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Anton Trantin — Still building.',
  description: 'Engineer, entrepreneur, and angel investor. From satellite software to global consumer products. A few things built, lessons learned, and what comes next.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
