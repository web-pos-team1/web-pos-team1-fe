import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { RecoilRoot } from 'recoil'

export type NextPageWithLayout<P ={}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout<P = {}> = AppProps<P> & {
  Component: NextPageWithLayout<P>
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <RecoilRoot>
      {getLayout(
      
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
      )}
    </RecoilRoot>
  )
}
