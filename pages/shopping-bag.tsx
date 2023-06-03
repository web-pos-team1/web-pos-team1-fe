import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/ShoppingBag.module.css'
import Link from 'next/link'
import ShoppingBagLayout from '@/components/layouts/shoppingBagLayout'
import { NextPageWithLayout } from './_app'
import Text2Button from "@/components/Text2Button";
import Text from "@/components/Text";
import style from "../components/layouts/shoppingBagLayout.module.css"
import GiftCardGuideModal from '@/components/GiftCardGuideModal'
import { useState } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import GiftCardNumberModal from '@/components/GiftCardNumberModal'
import axios from 'axios';
import { totalPriceState } from '@/state/totalPriceState'
import { mapToBE } from '@/components/globalfunctions/mapToBE'

const inter = Inter({ subsets: ['latin'] })

const Shoppingbag: NextPageWithLayout = () => {

  const [showGiftCardGuideModal, setShowGiftCardGuideModal] = useState<boolean>(false);
  const [showGiftCardGuideNumberModal, setShowGiftCardGuideNumberModal] = useState<boolean>(false);
  const [serialNumber, setSerialNumber] = useState<string>('');

  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

  const handleGiftCardGuideModalShowTrue = () => {
    setShowGiftCardGuideModal(true);
  };
  const handlePaperBagClick = () => {
    console.log("===종이백 선택했음===");
    alert("종이백 수량 입력하는 모달뜨기");
  }
  const handleRecyclingBagClick = () => {
    console.log("===재활용 가방 선택했음===");
    alert("재활용백 수량 입력하는 모달뜨기");
  }
  const handleNoClick = () => {
    console.log("===필요없음 선택했음===")
    setShowGiftCardGuideModal(true);
  }

  const handleCloseGiftCardGuideModal = () => {
    console.log("==handleCloseGiftCardGuideModal==")
    setShowGiftCardGuideModal(false);
    setShowGiftCardGuideNumberModal(true);
  }

  const handleCloseGiftCardNumberModal = () => {
    console.log("==handleCloseGiftCardNumberModal==");
    setShowGiftCardGuideModal(false);
    setShowGiftCardGuideNumberModal(false);
  }


  return (
    <>
      <Head>
        <title>POS Shopping bag</title>
        <meta name="description" content="Shopping bag purchase page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {/* 상품권 사용하시겠습니까 -> 예/아니오  */}
      <GiftCardGuideModal show={showGiftCardGuideModal} onClose={handleCloseGiftCardGuideModal} />
        {/* 상품권 번호 입력 */}
      <GiftCardNumberModal 
        show={showGiftCardGuideNumberModal} 
        onClose={handleCloseGiftCardNumberModal}
        serialNumber={serialNumber}
        setSerialNumber={setSerialNumber}
      />
        <Text text="필요하신 쇼핑백을 선택해 주세요" />
        <div className={style.upperBtn}>
          <Text2Button src="/images/paperBagg.png" alt="purchase paper bag" text1="종이봉투" text2="(100원)" onClick={handlePaperBagClick} />
        </div>
        <div className={style.lowerBtn}>
          <Text2Button src="/images/recyclingBaggg.png" alt="purchase recycling bag" text1="종량제봉투" text2="(850원)" onClick={handleRecyclingBagClick} />
          <Text2Button src="/images/forbiden.png" alt="pass this step" text1="필요없음" onClick={handleNoClick} />
        </div>
      </main>
    </>
  )
}

Shoppingbag.getLayout = function getLayout(page: React.ReactNode) {
  return(
    <>
      <RecoilRoot>
        <ShoppingBagLayout>
          {page}
        </ShoppingBagLayout>
      </RecoilRoot>
    </>
  )
}

export default Shoppingbag