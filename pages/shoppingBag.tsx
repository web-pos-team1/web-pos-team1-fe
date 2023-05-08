import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/ShoppingBag.module.css'
import Link from 'next/link'
import ShoppingBagLayout from '@/components/layouts/shoppingBagLayout'
import { NextPageWithLayout } from './_app'

const inter = Inter({ subsets: ['latin'] })

const Shoppingbag: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>POS Shopping bag</title>
        <meta name="description" content="Shopping bag purchase page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

      </main>
    </>
  )
}

Shoppingbag.getLayout = function getLayout(page: React.ReactNode) {
  return(
    <>
    <ShoppingBagLayout>
      {page}
    </ShoppingBagLayout>
    </>
  )
}

export default Shoppingbag