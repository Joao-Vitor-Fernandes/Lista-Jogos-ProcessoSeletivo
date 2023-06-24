import { Html, Head, Main, NextScript } from 'next/document'

import { Header } from '../components/Head'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Header />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
