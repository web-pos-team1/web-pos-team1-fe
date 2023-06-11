import React from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"
import { RecoilRoot, useRecoilState } from "recoil";
import { LanguageIndexState } from "@/state/LanguageIndexState";

export default function MainLayout(props:{children:React.ReactNode}) {
    const [languageIndex, setLanguageIndex] = useRecoilState(LanguageIndexState);
    return (
        <div>
                <Header 
                    languageIndex={languageIndex}
                    setLanguageIndex={setLanguageIndex}
                />
            <Location />
            {props.children}
            
        </div>
    )
}