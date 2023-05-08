import React from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/Button";
import Text from "@/components/Text";

export default function ShoppingBagLayout(props:{children:React.ReactNode}) {
    return (
        <div>
            <Header />
            <Location />
            {props.children}
            <Text text="필요하신 쇼핑백을 선택해 주세요" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '82px', margin: '90px 198px 160px 198px' }}>
                <Button src="/images/paperBagg.png" alt="purchase paper bag" text="종이봉투" onClick={() => console.log('btn 1')}/>
                <Button src="/images/recyclingBag.png" alt="purchase recycling bag" text="종량제봉투" onClick={() => console.log('btn 2')}/>
                <Button src="/images/forbiden.png" alt="pass this step" text="필요없음" onClick={() => console.log('btn 3')}/>
            </div>
            <Link href='/ssgService'>
            <Footer />
            </Link>
        </div>
    )
}