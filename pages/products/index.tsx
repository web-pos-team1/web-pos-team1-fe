import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import CategorylistLayout from '@/components/layouts/categorylistLayout'
import { NextPageWithLayout } from '../_app'
import { RecoilRoot } from 'recoil'

const inter = Inter({ subsets: ['latin'] })

const Products: NextPageWithLayout = () => {

  return (
    <>
      <Head>
        <title>POS category list</title>
        <meta name="description" content="Category list page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}

Products.getLayout = function getLayout(page: React.ReactNode) {
  return(
    <>
      <RecoilRoot>
        <CategorylistLayout>
          {page}
        </CategorylistLayout>
      </RecoilRoot>
    </>
  )
}

export default Products

