import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Payments.module.css'
import Link from 'next/link'
import PaymentsLayout from '@/components/layouts/paymentsLayout'
import { NextPageWithLayout } from './_app'
import { RecoilRoot } from 'recoil'

const inter = Inter({ subsets: ['latin'] })

const Payments: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>POS Payments</title>
        <meta name="description" content="Payments page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      </main>
    </>
  )
}

Payments.getLayout = function getLayout(page: React.ReactNode) {
  return(
    <>
    <RecoilRoot>
      <PaymentsLayout>
        {page}
      </PaymentsLayout>
    </RecoilRoot>
    </>
  )
}

export default Payments

