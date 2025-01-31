'use client'

import './globals.css';
import NavBar from '@/components/NavBar'
import { ThemeProvider } from 'next-themes'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider attribute='class' defaultTheme='dark'>
        <NavBar />
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
