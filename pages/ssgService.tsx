import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/SsgService.module.css'
import Link from 'next/link'
import SsgServiceLayout from '@/components/layouts/ssgServiceLayout'
import { NextPageWithLayout } from './_app'
import { RecoilRoot } from 'recoil'

const inter = Inter({ subsets: ['latin'] })

const SsgService: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>POS SSG service</title>
        <meta name="description" content="SSG service page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

      </main>
    </>
  )
}

SsgService.getLayout = function getLayout(page: React.ReactNode) {
  return(
    <>
      <RecoilRoot>
        <SsgServiceLayout>
          {page}
        </SsgServiceLayout>    
      </RecoilRoot>
    </>
  )
}

export default SsgService