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
         <Provider store={store}> {/* Redux store */}
          <HeroUIProvider> {/* Hero UI component library */}
            <ThemeProvider attribute='class' defaultTheme='light'> {/* next-themes */}
              <CustomThemeProvider>
                <Header />
                <main>
                  {children}
                </main>
              </CustomThemeProvider>
            </ThemeProvider>
          </HeroUIProvider>
        </Provider>
      </body>
    </html>
  );
}