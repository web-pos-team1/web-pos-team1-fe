import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Points.module.css'
import Link from 'next/link'
import { NextPageWithLayout } from './_app'
import PointsLayout from '@/components/layouts/pointsLayout'

const inter = Inter({ subsets: ['latin'] })

const Points: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>POS Points</title>
        <meta name="description" content="Points page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main className={styles.main}>

        <div className={styles.description}>
          <h1>
            신세계포인트 적립방법을 선택해 주세요
          </h1>
        </div>
      </main> */}
    </>
    
  );
}

Points.getLayout = function getLayout(page: React.ReactNode) {
  return(
    <>
    <PointsLayout>
      {page}
    </PointsLayout>
    </>
  )
}

export default Points
