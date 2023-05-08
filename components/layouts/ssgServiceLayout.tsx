import React from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/Button";
import Text from "@/components/Text";

export default function ssgServiceLayout(props:{children:React.ReactNode}) {
    return (
        <div>
            <Header />
            <Location />
            {props.children}
            <Text text="이용하실 SSG service를 선택해 주세요" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '82px', margin: '90px 198px 160px 198px' }}>
                <Link href="/shoppingBag">
                <Button src="/images/pickUp.png" alt="purchase paper bag" text="픽업" onClick={() => console.log('btn 1')}/>
                </Link>
                <Button src="/images/deliveryService.png" alt="purchase recycling bag" text="배송" onClick={() => console.log('btn 2')}/>
                <Button src="/images/giftService.png" alt="pass this step" text="선물" onClick={() => console.log('btn 3')}/>
            </div>
            <Link href='/points'>
            <Footer />
            </Link>
        </div>
    )
}