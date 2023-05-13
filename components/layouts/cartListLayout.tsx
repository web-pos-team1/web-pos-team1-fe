import React from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/Button";
import Text from "@/components/Text";

export default function cartListLayout(props:{children:React.ReactNode}) {
    return (
        <div>
            <Header />
            <Location />
            {props.children}
        </div>
    )
}