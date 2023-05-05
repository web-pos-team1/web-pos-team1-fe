import React from "react";
import Header from "@/components/Header";

export default function Layout(props:{children:React.ReactNode}) {
    return (
        <div>
            <Header />
            {props.children}
            <h2>footer</h2>
        </div>
    )
}