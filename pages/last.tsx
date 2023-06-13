import Head from 'next/head'
import Image from 'next/image'
import { IBM_Plex_Sans_KR, Inter } from '@next/font/google'
import styles from '@/styles/Last.module.css'
import Link from 'next/link'
import { NextPageWithLayout } from './_app'
import LastLayout from '@/components/layouts/lastLayout'
import React, { useEffect, useState } from 'react'
import Receipt from '@/components/AlertModal/Receipt'
import { useRecoilValue } from 'recoil'
import { MarchantUidState } from '@/state/MarchantUidState'

const ibmPlexSansKR = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: '400',
})

const Last: NextPageWithLayout = () => {
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const marchantUid = useRecoilValue<string>(MarchantUidState);

  useEffect(() => {
    localStorage.setItem("cartList", '[]');
    console.log("send to BE marchantUid: ", marchantUid);
    setShowReceipt(true);
  }, [])
  return (
    <>
      <Receipt show={showReceipt} onClose={setShowReceipt} />
      <Head>
        <title>POS success</title>
        <meta name="description" content="The last page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
            <Image
              className={styles.logo}
              src="/images/main_logo.png"
              alt="main Logo"
              width={800}
              height={800}
            />
        </div>
          <div className={styles.font}>
            <h1>이용해 주셔서 감사합니다<br/>
                즐거운 쇼핑되세요
            </h1>
          </div>

        {/* <div className={styles.home_btn}>
            <Link href='/'>
              <button>홈으로</button>
            </Link>
        </div> */}

      </main>
    </>
  )
}

Last.getLayout = function getLayout(page: React.ReactNode) {
  return(
    <>
    <LastLayout>
      {page}
    </LastLayout>
    </>
  )
}

export default Last