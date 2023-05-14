import React from "react";
import Header from "@/components/Header";
import PhoneNumber from "../PhoneNumber";

export default function Layout(props:{children:React.ReactNode}) {
    return (
        <div>
            <Header />
            <PhoneNumber />
            {props.children}
        </div>
    )
}
