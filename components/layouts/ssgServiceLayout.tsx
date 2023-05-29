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
import DeliveryTimeModal from "../DeliveryTimeModal";
import { RecoilRoot, useRecoilState } from "recoil";
import { totalPriceState } from "@/state/totalPriceState";
import GiftCardGuideModal from "../GiftCardGuideModal";
import GiftCardNumberModal from "../GiftCardNumberModal";


export default function ssgServiceLayout(props:{children:React.ReactNode}) {

    const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

    
    return (
        <>
        <RecoilRoot>
            <Header />
        </RecoilRoot>
            <Location />
            {props.children}
            <Footer 
                totalPrice={totalPrice}
            />
        </>
    )
}