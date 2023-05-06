import React from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"

export default function MainLayout(props:{children:React.ReactNode}) {
    return (
        <div>
            <Header />
            <Location />
            {props.children}
        </div>
    )
}