import {HeroUIProvider} from '@heroui/react'
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <Component {...pageProps} />
    </HeroUIProvider>
  )
}

export default MyApp;