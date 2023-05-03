import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Payments.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Payments() {
  return (
    <>
      <Head>
        <title>POS Payments</title>
        <meta name="description" content="Payments page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div className={styles.description}>
          <h1>
            결제 방식을 선택해주세요
          </h1>
        </div>

        <div className={styles.center}>
          
          <div className={styles.creditCard_btn}>
            <button>신용/체크카드</button>
          </div>
          
          <div className={styles.mobilePayments_btn}>
            <button>모바일페이</button>
          </div>
          
          <div className={styles.simplePayments_btn}>
            <button>간편결제</button>
          </div>

          <div className={styles.internationalPayments_btn}>
            <button>해외결제</button>
          </div>


        </div>

        <div className={styles.pre_btn}>
            <Link href='/ssgService'>
                <button>이전단계</button>
            </Link>
        </div>
        
      </main>
    </>
  )
}
