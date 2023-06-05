import Head from 'next/head'
import Image from 'next/image'
import { IBM_Plex_Sans_KR, Inter } from '@next/font/google'
import styles from '@/styles/Points.module.css'
import Link from 'next/link'
import { NextPageWithLayout } from './_app'
import PointsLayout from '@/components/layouts/pointsLayout'
import { RecoilRoot } from 'recoil'


const ibmPlexSansKR = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: '400',
})

const Points: NextPageWithLayout = () => {

  return (
    <>
      <Head>
        <title>POS Points</title>
        <meta name="description" content="Points page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
    
  );
}

Points.getLayout = function getLayout(page: React.ReactNode) {
  return(
    <>
      <RecoilRoot>
        <PointsLayout>
          {page}
        </PointsLayout>
      </RecoilRoot>
    </>
  )
}

export default Points
