'use client';

import './globals.css';
import Header from '@/components/Header';
import { ThemeProvider as CustomThemeProvider } from '@/context/ThemeContext';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import store from '@/store';
import { HeroUIProvider } from '@heroui/react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Provider store={store}>
          <HeroUIProvider>
            <ThemeProvider attribute='class' defaultTheme='light'>
              <CustomThemeProvider>
                <Header />
                {children}
              </CustomThemeProvider>
            </ThemeProvider>
          </HeroUIProvider>
        </Provider>
      </body>
    </html>
  );
}