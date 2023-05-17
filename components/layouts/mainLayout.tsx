import React from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"
import { RecoilRoot } from "recoil";

export default function MainLayout(props:{children:React.ReactNode}) {
    return (
        <div>
            <RecoilRoot>
                <Header />
            </RecoilRoot>
            <Location />
            {props.children}
        </div>
    )
}