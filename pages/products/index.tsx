import React, { useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import CategorylistLayout from '@/components/layouts/categorylistLayout'
import { NextPageWithLayout } from '../_app'
import { RecoilRoot, useRecoilState } from 'recoil'
import { PayObjectState } from '@/state/PayObjectState'

const inter = Inter({ subsets: ['latin'] })

const Products: NextPageWithLayout = () => {
  const [payObjectState, setPayObjectState] = useRecoilState(PayObjectState);
  useEffect(() => {
    // console.log("Object.keys(payObjectState).length: ", Object.keys(payObjectState).length)
    if (!payObjectState) {
      let { IMP } = window;
      setPayObjectState(IMP);
      console.log("succcess to init IMP to recoilState");
      console.log("IMP: ", IMP);
    }
  }, [])

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
        <CategorylistLayout>
          {page}
        </CategorylistLayout>
    </>
  )
}

export default Products

