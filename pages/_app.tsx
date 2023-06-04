import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { IBM_Plex_Sans_KR } from 'next/font/google'
import { ReactElement, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

const ibmPlexSansKR = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: '400',
})

export type NextPageWithLayout<P ={}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout<P = {}> = AppProps<P> & {
  Component: NextPageWithLayout<P>
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <RecoilRoot>
      <main className={ibmPlexSansKR.className}>
        <Component {...pageProps} />
      </main>
    </RecoilRoot>
  )
}
