import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import SsgServiceLayout from '@/components/layouts/ssgServiceLayout'
import { NextPageWithLayout } from './_app'
import { RecoilRoot, useRecoilState } from 'recoil'
import Button from "@/components/Button";
import Text from "@/components/Text";
import style from "../components/layouts/shoppingBagLayout.module.css"
import React from 'react'
import DeliveryServiceModal from '@/components/DeliveryServiceModal'
import { UserLoginState } from '@/state/UserLoginState'
import GiftModal from '@/components/GiftModal'

const inter = Inter({ subsets: ['latin'] })

const SsgService: NextPageWithLayout = () => {

  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isMemberOpen, setIsMemberOpen] = React.useState<boolean>(false);
  const [isGiftOpen, setIsGiftOpen] = React.useState<boolean>(false);

  // const [useLoginState, setUseLoginState] = React.useState<boolean>(false);
  const [userLoginState, setUserLoginState] = useRecoilState(UserLoginState)
  
  const handleMemberChecker = () => {
    console.log("enter handleMemberChecker()");
    if (userLoginState) {
      console.log("user Logined!!");
      setIsMemberOpen(true)
    } else {
      console.log("user not Logined!!");
      setIsOpen(true)
    }
}

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
      {/* < MemberDeliveryServiceModal
        isOpen={isMemberOpen}
        setIsOpen={setIsMemberOpen}
      /> */}

      <GiftModal 
        show={isGiftOpen}
        onClose={setIsGiftOpen}/>

      <Text text="이용하실 SSG service를 선택해 주세요" />
            <div className={style.upperBtn}>
                <Link href="/shoppingBag">
                    <Button src="/images/pickUp.png" alt="purchase paper bag" text="픽업" onClick={() => console.log('btn 1')}/>
                </Link>
            </div>
            <div className={style.lowerBtn}>
                <Button src="/images/deliveryService.png" alt="purchase recycling bag" text="배송" onClick={()=>handleMemberChecker()}/>
                <Button src="/images/giftService.png" alt="pass this step" text="선물" onClick={() => setIsGiftOpen(true)}/>
            </div>


      </main>
    </>
  )
}

SsgService.getLayout = function getLayout(page: React.ReactNode) {
  return(
    <>
      <RecoilRoot>
        <SsgServiceLayout>
          {page}
        </SsgServiceLayout>    
      </RecoilRoot>
    </>
  )
}

export default SsgService