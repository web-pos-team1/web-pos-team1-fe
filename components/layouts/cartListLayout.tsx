import React from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { RecoilRoot } from "recoil";
import { IBM_Plex_Sans_KR } from "next/font/google";

// const ibmPlexSansKR = IBM_Plex_Sans_KR({
//     subsets: ['latin'],
//     weight: '400',
// });

export default function cartListLayout(props:{children:React.ReactNode}) {
    return (
        <div>
            {/* <html lang="ko" className={ibmPlexSansKR.className}> */}
            <RecoilRoot>
                <Header />
            </RecoilRoot>
            <Location />
            {props.children}
            {/* </html> */}
        </div>
    )
}