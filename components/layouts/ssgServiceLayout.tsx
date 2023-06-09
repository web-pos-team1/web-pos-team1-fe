import React, { useState } from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import { RecoilRoot, useRecoilState } from "recoil";
import { totalPriceState } from "@/state/totalPriceState";

export default function ssgServiceLayout(props:{children:React.ReactNode}) {

    const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

    
    return (
        <>
            <Header />
            <Location />
            {props.children}
            <Footer 
                // totalPrice={totalPrice}
            />
        </>
    )
}