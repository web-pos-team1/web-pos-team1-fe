import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Carts.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Carts() {
  return (
    <>
      <Head>
        <title>POS Carts</title>
        <meta name="description" content="Carts page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div className={styles.center}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            >
          <Image
            className={styles.logo}
            src="/images/main_logo.png"
            alt="main Logo"
            width={500}
            height={500}
            priority
          />
          </a>
        </div>

        <div className={styles.pre_btn}>
            <Link href='/products'>
                <button>이전단계</button>
            </Link>
        </div>

        <div className={styles.next_btn}>
            <button>결제하기</button>
            {/* 여기엔 Onclick사용해서 alert창 생성되게 만들어야 할것 같음 */}
        </div>
        
      </main>
    </>
  )
}
