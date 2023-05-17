import React from "react";
import Header from "@/components/Header";
import PhoneNumber from "../PhoneNumber";
import { RecoilRoot } from "recoil";

export default function Layout(props:{children:React.ReactNode}) {
    return (
        <div>
            <RecoilRoot>
                <Header />
            </RecoilRoot>
            {props.children}
        </div>
    )
}
