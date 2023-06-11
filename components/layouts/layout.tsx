import React from "react";
import Header from "@/components/Header";

export default function Layout(props:{children:React.ReactNode}) {
    return (
        <div>
            <Header />
            {props.children}
        </div>
    )
}
