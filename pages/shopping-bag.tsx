import Head from 'next/head'
import Image from 'next/image'
import { IBM_Plex_Sans_KR, Inter } from '@next/font/google'
import styles from '@/styles/ShoppingBag.module.css'
import Link from 'next/link'
import ShoppingBagLayout from '@/components/layouts/shoppingBagLayout'
import { NextPageWithLayout } from './_app'
import Text2Button from "@/components/Text2Button";
import Text from "@/components/Text";
import style from "../components/layouts/shoppingBagLayout.module.css"
import GiftCardGuideModal from '@/components/GiftCardGuideModal'
import { useEffect, useState } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import GiftCardNumberModal from '@/components/GiftCardNumberModal'
import axios from 'axios';
import { totalPriceState } from '@/state/totalPriceState'
import { mapToBE } from '@/components/globalfunctions/mapToBE'
import React from 'react'
import PaperBagModal from '@/components/PaperBagModal'
import RecyclingBagModal from '@/components/RecyclingBagModal'

const ibmPlexSansKR = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: '400',
})

const Shoppingbag: NextPageWithLayout = () => {

  const [showGiftCardGuideModal, setShowGiftCardGuideModal] = useState<boolean>(false);
  const [showGiftCardGuideNumberModal, setShowGiftCardGuideNumberModal] = useState<boolean>(false);
  const [serialNumber, setSerialNumber] = useState<string>('');

  const [isPaperbagOpen, setIsPaperbagOpen] = useState<boolean>(false);
  const [isRecyclingbagOpen, setIsRecyclingbagOpen] = useState<boolean>(false);


  const [giftCardMatchShow, setGiftCardMatchShow] = useState<boolean>(false);
  const [giftCardExpiredShow, setGiftCardExpiredShow] = useState<boolean>(false);
  const [giftCardNotExistShow, setGiftCardNotExistShow] = useState<boolean>(false);
  const [giftCardOverPriceShow, setGiftCardOverPriceShow] = useState<boolean>(false);
  const [giftCardUsedShow, setGiftCardUsedShow] = useState<boolean>(false);

  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

  const handleGiftCardGuideModalShowTrue = () => {
    setShowGiftCardGuideModal(true);
  };
  const handlePaperBagClick = () => {
    setIsPaperbagOpen(true)
    // console.log("===종이백 선택했음===");
    // alert("종이백 수량 입력하는 모달뜨기");
  }
  const handleRecyclingBagClick = () => {
    setIsRecyclingbagOpen(true)
    // console.log("===재활용 가방 선택했음===");
    // alert("재활용백 수량 입력하는 모달뜨기");
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

  const handleCloseGiftCardExpired = () => {
    setSerialNumber('');
    setGiftCardExpiredShow(false);
  }
  const handleGiftCardNotExist = () => {
    setSerialNumber('');
    setGiftCardNotExistShow(false);
  }

  const handleCloseGiftCardOverPrice = () => {
    setSerialNumber('');
    setGiftCardOverPriceShow(false);
  }

  const handleCloseGiftCardUsed = () => {
    setSerialNumber('');
    setGiftCardUsedShow(false);
  }
  
  const handleCheckGiftCardNumber = () => {
    console.log("serialNumber: ", serialNumber);
    let url = mapToBE(`/api/v1/gift-card/valid`);
    // let url = `http://localhost:8080/api/v1/gift-card/valid`;
    let reqData = {
      'storeId': process.env.NEXT_PUBLIC_ENV_STORE_ID,
      'posId': process.env.NEXT_PUBLIC_ENV_POS_ID,
      "serialNumber": serialNumber,
    }
    const reqHeaders = {
      'content-type': 'application/json'
    };
    axios(url, {
      headers: reqHeaders,
      method: 'post',
      data: reqData,
    })
    .then((res) => {
      console.log("res: ", res);
      // totalPrice보다 금액이 넘어선 경우
      if (res.data.deductedPrice > totalPrice) {
        console.log("초과된 금액은 사용할 수 없습니다.");
        setGiftCardOverPriceShow(true);
      } else { // 정상적으로 쿠폰 사용이 가능한 경우
        console.log("유효한 쿠폰입니다.");
        setGiftCardMatchShow(true);
        console.log("적용될 상품권 할인 금액: " + res.data.deductedPrice)
      }
    })
    .catch((err) => {
      console.log("err: ", err);
      console.log("err.request: ", err.request);
      if (err.request.status === 400) {
        console.log("이미 사용된 쿠폰입니다.");
        setGiftCardUsedShow(true);
      } else if (err.request.status === 402) {
        console.log("만료된 쿠폰입니다.");
        setGiftCardExpiredShow(true);
      } else if (err.request.status === 500) {
        console.log("존재하지 않는 쿠폰입니다.");
        setGiftCardNotExistShow(true)
      }
    })
  }
  // useEffect(() => {
  //   console.log("shopping-bag/useEffect()/totalPrice: ", totalPrice);
  // }, [totalPrice])

  return (
    <>
      <Head>
        <title>POS Shopping bag</title>
        <meta name="description" content="Shopping bag purchase page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <PaperBagModal 
        show={isPaperbagOpen} 
        onClose={setIsPaperbagOpen}
        />
      <RecyclingBagModal show={isRecyclingbagOpen} onClose={setIsRecyclingbagOpen}/>
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