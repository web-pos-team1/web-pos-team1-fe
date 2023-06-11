import React, {Dispatch, SetStateAction} from "react";
import Header from "@/components/Header";
import PhoneNumber from "../PhoneNumber";
import { RecoilRoot, useRecoilState } from "recoil";
import { SetAccessorDeclaration } from "typescript";
import { LanguageIndexState } from "@/state/LanguageIndexState";

export default function Layout(
    props: {
        children: React.ReactNode
    }) {
        const [languageIndex, setLanguageIndex] = useRecoilState<number>(LanguageIndexState);
    return (
        <div>
            <Header 
                languageIndex={languageIndex}
                setLanguageIndex={setLanguageIndex}
            />
            {props.children}
        </div>
    )
}
