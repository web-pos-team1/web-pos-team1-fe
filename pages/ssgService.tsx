import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/SsgService.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function SsgService() {
  return (
    <>
      <Head>
        <title>POS SSG service</title>
        <meta name="description" content="SSG service page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div className={styles.description}>
          <h1>
            이용하실 SSG service를 선택해 주세요
          </h1>
        </div>

        <div className={styles.center}>
          
          <div className={styles.pickUp_btn}>
            <Link href='/shoppingBag'>
              <button>픽업</button>
            </Link>
          </div>
          
          <div className={styles.delivery_btn}>
            {/* delivery modal + deactivation under 30000won */}
              <button>배송</button>
          </div>
          
          <div className={styles.gift_btn}>
            {/* gift modal + deactivation under 30000won */}
              <button>선물</button>
          </div>

        </div>

        <div className={styles.pre_btn}>
            <Link href='/points'>
                <button>이전단계</button>
            </Link>
        </div>
        
      </main>
    </>
  )
}
