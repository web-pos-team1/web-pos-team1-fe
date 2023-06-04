import Head from 'next/head'
import Image from 'next/image'
import { IBM_Plex_Sans_KR, Inter } from 'next/font/google'
import styles from '@/styles/Last.module.css'
import Link from 'next/link'
import { NextPageWithLayout } from './_app'
import LastLayout from '@/components/layouts/lastLayout'

const ibmPlexSansKR = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: '400',
})

const Last: NextPageWithLayout = () => {
  return (
    <>
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