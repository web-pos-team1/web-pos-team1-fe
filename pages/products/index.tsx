import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import styles from '@/styles/Products.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Products() {
  return (
    <>
      <Head>
        <title>POS products list</title>
        <meta name="description" content="Products list page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.center}>
          
          <Image
            className={styles.logo}
            src="/images/main_logo.png"
            alt="main Logo"
            width={500}
            height={500}
            priority
          />
        </div>

        <div className={styles.description}>
            <h1>
                카테고리를 선택해주세요
            </h1>
        </div>
        <div className={styles.category_btn}>
        <Link href='/products/category'>
            <ul>
                <li>과일</li>
                <li>채소</li>
                <li>정육/계란</li>
                <li>수산</li>
                <li>쌀/견과</li>
                <li>우유/유제품</li>
                <li>간식</li>
                <li>소스/오일</li>
                <li>선물</li>
            </ul>
        </Link>
        </div>

        <div className={styles.grid}>
          {/* <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a> */}
        </div>

        

      </main>
    </>
  )
}
