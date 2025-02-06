'use client';

import './globals.css';
import Header from '@/components/Header';
import { ThemeProvider } from 'next-themes';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <ThemeProvider attribute='class' defaultTheme='dark'>
        <Header />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
