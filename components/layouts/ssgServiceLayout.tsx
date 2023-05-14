import React, { useState } from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/Button";
import Text from "@/components/Text";
import style from "./shoppingBagLayout.module.css"
import GiftModal from "../GiftModal";

export default function ssgServiceLayout(props:{children:React.ReactNode}) {

    const [showGiftModal, setShowGiftModal] = useState<boolean>(false);

    const handleModal = () => {
        console.log('modal')
        setShowGiftModal(true)
      }
    
    return (
        <>
        <GiftModal show={showGiftModal} onClose={setShowGiftModal} />
            <Header />
            <Location />
            {props.children}
            <Text text="이용하실 SSG service를 선택해 주세요" />
            <div className={style.upperBtn}>
                <Link href="/shoppingBag">
                    <Button src="/images/pickUp.png" alt="purchase paper bag" text="픽업" onClick={() => console.log('btn 1')}/>
                </Link>
            </div>
            <div className={style.lowerBtn}>
                <Button src="/images/deliveryService.png" alt="purchase recycling bag" text="배송" onClick={() => console.log('btn 2')}/>
                <Button src="/images/giftService.png" alt="pass this step" text="선물" onClick={() => setShowGiftModal(true)}/>
            </div>
            <Footer />
        </>
    )
}