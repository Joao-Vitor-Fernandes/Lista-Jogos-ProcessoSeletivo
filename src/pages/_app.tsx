import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../styles/theme'
import { Navbar } from '@/components/Navbar/navbar'
import { Footer } from '@/components/Footer/footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme} >
      <Navbar />
        <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  )
}
