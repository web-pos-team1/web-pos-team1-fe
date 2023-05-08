import React from "react";
import Header from "@/components/Header";
import Location from "@/components/Location";
import HomeButton from "@/components/HomeButton";
import Link from "next/link";

export default function LastLayout(props:{children:React.ReactNode}) {
    return (
        <div>
            <Header />
            <Location />
            {props.children}
            <Link href="/">
            <HomeButton src="/images/home.png" alt="goto main page" text="홈으로" onClick={() => console.log('btn 1')}/>
            </Link>
        </div>
    )
}
