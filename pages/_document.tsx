import { Html, Head, Main, NextScript } from 'next/document'
import { RecoilRoot } from 'recoil'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            cross-origin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,600;0,700;0,900;1,400&display=swap"
            rel="stylesheet"
          />
      </Head>
      <body>
        <Main />
        <NextScript />
          <RecoilRoot>
            <div id="modal-root"></div>
          </RecoilRoot>
        
      </body>
    </Html>
  )
}
