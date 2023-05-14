import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/ShoppingBag.module.css'
import Link from 'next/link'
import ShoppingBagLayout from '@/components/layouts/shoppingBagLayout'
import { NextPageWithLayout } from './_app'
import Text2Button from "@/components/Text2Button";
import Text from "@/components/Text";
import style from "../components/layouts/shoppingBagLayout.module.css"
import GiftCardGuideModal from '@/components/GiftGuideCardModal'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

const Shoppingbag: NextPageWithLayout = () => {

  const [showGiftCardGuideModal, setShowGiftCardGuideModal] = useState<boolean>(false);
  
    const handleModal = () => {
      setShowGiftCardGuideModal(true);
    };
  

  return (
    <>
      <Head>
        <title>POS Shopping bag</title>
        <meta name="description" content="Shopping bag purchase page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <GiftCardGuideModal show={showGiftCardGuideModal} onClose={setShowGiftCardGuideModal} />

      <Text text="필요하신 쇼핑백을 선택해 주세요" />
        <div className={style.upperBtn}>
          <Text2Button src="/images/paperBagg.png" alt="purchase paper bag" text1="종이봉투" text2="(100원)" onClick={handleModal} />
        </div>
        <div className={style.lowerBtn}>
          <Text2Button src="/images/recyclingBaggg.png" alt="purchase recycling bag" text1="종량제봉투" text2="(850원)" onClick={handleModal} />
          <Text2Button src="/images/forbiden.png" alt="pass this step" text1="필요없음" onClick={handleModal} />
        </div>
      </main>
    </>
  )
}

Shoppingbag.getLayout = function getLayout(page: React.ReactNode) {
  return(
    <>
    <ShoppingBagLayout>
      {page}
    </ShoppingBagLayout>
    </>
  )
}

export default Shoppingbag