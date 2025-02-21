'use client';

import './globals.css';
import Header from '@/components/Header';
import { ThemeProvider as CustomThemeProvider } from '@/context/ThemeContext';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';
import store from '@/store';
import { HeroUIProvider } from '@heroui/react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang='en' suppressHydrationWarning>
      <body>
         <Provider store={store}> {/* Redux store */}
          <HeroUIProvider> {/* Hero UI component library */}
            <ThemeProvider attribute='class' defaultTheme='light'> {/* next-themes */}
              <CustomThemeProvider>
                <Header />
                <AnimatePresence>
                  <motion.main
                    key={pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ ease: "easeInOut", duration: 0.5 }}
                  >
                    {children}
                  </motion.main>
                </AnimatePresence>
              </CustomThemeProvider>
            </ThemeProvider>
          </HeroUIProvider>
        </Provider>
      </body>
    </html>
  );
}