import React, { useState } from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/Button";
import Text from "@/components/Text";
import style from "./shoppingBagLayout.module.css"
import GiftModal from "../GiftModal";
import Delivery from "@/pages/delivery";
import DeliveryModal from "../DeliveryModal";
import { RecoilRoot, useRecoilState } from "recoil";
import { totalPriceState } from "@/state/totalPriceState";

export default function ssgServiceLayout(props:{children:React.ReactNode}) {

    const [showGiftModal, setShowGiftModal] = useState<boolean>(false);
    const [showDeliveryModal, setShowDeliveryModal] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

    const handleModal = () => {
        console.log('modal')
        setShowGiftModal(true)
      }

    const handleDeliveryModal = () => {
        setShowDeliveryModal(true)
    }
    
    return (
        <>
        <GiftModal show={showGiftModal} onClose={setShowGiftModal} />
        <DeliveryModal show={showDeliveryModal} onClose={setShowDeliveryModal} />
        <RecoilRoot>
            <Header />
        </RecoilRoot>
            <Location />
            {props.children}
            <Text text="이용하실 SSG service를 선택해 주세요" />
            <div className={style.upperBtn}>
                <Link href="/shoppingBag">
                    <Button src="/images/pickUp.png" alt="purchase paper bag" text="픽업" onClick={() => console.log('btn 1')}/>
                </Link>
            </div>
            <div className={style.lowerBtn}>
                <Button src="/images/deliveryService.png" alt="purchase recycling bag" text="배송" onClick={() => setShowDeliveryModal(true)}/>
                <Button src="/images/giftService.png" alt="pass this step" text="선물" onClick={() => setShowGiftModal(true)}/>
            </div>
            <Footer 
                totalPrice={totalPrice}
            />
        </>
    )
}