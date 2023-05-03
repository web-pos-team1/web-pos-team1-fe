import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/ShoppingBag.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function ShoppingBag() {
  return (
    <>
      <Head>
        <title>POS Shopping bag</title>
        <meta name="description" content="Shopping bag purchase page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div className={styles.description}>
          <h1>
            필요하신 쇼핑백 선택해 주세요
          </h1>
        </div>

        <div className={styles.center}>
          
          <div className={styles.paperBag_btn}>
            {/* prices have applied at payment step */}
              <button>종이봉투</button>
          </div>
          
          <div className={styles.garbageBag_btn}>
            {/* prices have applied at payment step */}
              <button>종량제봉투</button>
          </div>
          
          <div className={styles.pass_btn}>
            <Link href='/payments'>
              <button>필요 없음</button>
            </Link>
          </div>

        </div>

        <div className={styles.pre_btn}>
            <Link href='/ssgservice'>
                <button>이전단계</button>
            </Link>
        </div>

        <div className={styles.next_btn}>
          <Link href='/payments'>
            <button>결제하기</button>
          </Link>
        </div>
        
      </main>
    </>
  )
}
