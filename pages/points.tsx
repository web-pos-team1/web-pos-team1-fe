import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Points.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Points() {
  return (
    <>
      <Head>
        <title>POS Points</title>
        <meta name="description" content="Points page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div className={styles.description}>
          <h1>
            신세계포인트 적립방법을 선택해 주세요
          </h1>
        </div>

        <div className={styles.center}>
          
          <div className={styles.phoneNumber_btn}>
              <button>전화번호 입력</button>
          </div>
          
          <div className={styles.Barcode_btn}>
              <button>바코드 스캔</button>
          </div>
          
          <div className={styles.pointCard_btn}>
              <button>포인트카드 센싱</button>
          </div>
          
          <div className={styles.pass_btn}>
            <Link href='/ssgService'>
              <button>적립 안함</button>
            </Link>
          </div>

        </div>

        <div className={styles.pre_btn}>
            <Link href='/carts'>
                <button>이전단계</button>
            </Link>
        </div>

        <div className={styles.next_btn}>
          <Link href='/ssgService'>
            <button>결제하기</button>
          </Link>
        </div>
        
      </main>
    </>
  )
}
