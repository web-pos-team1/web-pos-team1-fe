import Head from 'next/head'
import Image from 'next/image'
import { IBM_Plex_Sans_KR } from '@next/font/google'
import Link from 'next/link'
import SsgServiceLayout from '@/components/layouts/ssgServiceLayout'
import { NextPageWithLayout } from './_app'
import { RecoilRoot, useRecoilState } from 'recoil'
import Button from "@/components/Button";
import Text from "@/components/Text";
import style from "../components/layouts/shoppingBagLayout.module.css"
import React, { useEffect } from 'react'
import DeliveryServiceModal from '@/components/DeliveryServiceModal'
import { UserLoginState } from '@/state/UserLoginState'
import GiftModal from '@/components/GiftModal'
import MemberDeliveryServiceModal from '@/components/MemberDeliveryServiceModal'
import { totalPriceState } from '@/state/totalPriceState'

const ibmPlexSansKR = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: '400',
})

const SsgService: NextPageWithLayout = () => {

  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isMemberOpen, setIsMemberOpen] = React.useState<boolean>(false);
  const [isGiftOpen, setIsGiftOpen] = React.useState<boolean>(false);

  // const [useLoginState, setUseLoginState] = React.useState<boolean>(false);
  const [userLoginState, setUserLoginState] = useRecoilState(UserLoginState)

  const [totalPrice, setTotalPrice] = useRecoilState<number>(totalPriceState);
  const [isLower, setIsLower] = React.useState<boolean>(false);
  
  const handleMemberChecker = () => {
    console.log("enter handleMemberChecker()");
    if (isLower) {
      console.log("==구매금액 3만원 이상부터 배송 및 선물 서비스 이용이 가능합니다.==")
      return;
    }
    if (userLoginState) {
      console.log("user Logined");
      setIsMemberOpen(true)
    } else {
      console.log("user not Logined");
      setIsOpen(true)
    }
  }

    useEffect(() => {
      if (totalPrice < 30000) {
        setIsLower(true);
      } else {
        setIsLower(false);
      }
    }, [totalPrice]);

    const handlePriceChange = (newPrice: number) => {
      setTotalPrice(newPrice);
    };
    

  return (
    <>
      <Head>
        <title>POS SSG service</title>
        <meta name="description" content="SSG service page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>

      {/* 비회원 */}
      <DeliveryServiceModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {/* 회원 */}
      < MemberDeliveryServiceModal
        isOpen={isMemberOpen}
        setIsOpen={setIsMemberOpen}
      />

      <GiftModal 
        show={isGiftOpen}
        onClose={setIsGiftOpen}/>

      <Text text="이용하실 SSG service를 선택해 주세요" />
      <div className={style.upperBtn}>
          <Link href="/shopping-bag">
              <Button src="/images/pickUp.png" alt="purchase paper bag" text="픽업" onClick={() => console.log('btn 1')}/>
          </Link>
      </div>
      <div className={`${style.lowerBtn} ${isLower ? style.lower : ''}`}>
          <Button 
            src="/images/deliveryService.png" 
            alt="purchase recycling bag" 
            text="배송" 
            onClick={()=>handleMemberChecker()}
            styleText={`${isLower ? `style.lower` : ''}`}
          />
          <Button 
            src="/images/giftService.png" 
            alt="pass this step" 
            text="선물" 
            onClick={() => setIsGiftOpen(true)}
            styleText={`${isLower ? `style.lower` : ''}`}
          />
      </div>


      </main>
    </>
  )
}

SsgService.getLayout = function getLayout(page: React.ReactNode) {
  return(
    <>
        <SsgServiceLayout>
          {page}
        </SsgServiceLayout>    
    </>
  )
}

export default SsgService