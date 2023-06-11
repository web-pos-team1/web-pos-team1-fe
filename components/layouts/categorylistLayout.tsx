import React, { useEffect, useState } from "react";
import Header from "@/components/Header"
import Link from "next/link";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { RecoilRoot, useRecoilState } from "recoil";
import { LanguageIndexState } from "@/state/LanguageIndexState";
import { IBM_Plex_Sans_KR } from "next/font/google";
import axios from 'axios';
import { LanguageDataType } from "@/types/LanguageDataType";

export default function CategorylistLayout(props:{children:React.ReactNode}) {
    const pageName = 'B0001';
    const layoutName = 'L0001';
    const [languageIndex, setLanguageIndex] = useRecoilState(LanguageIndexState);
    const [langDatas, setLangDatas] = useState<LanguageDataType>({});
    
    useEffect(() => {
        const url = `http://localhost:8080/api/v1/translation/${languageIndex}/${pageName}`;
        axios.get(url)
        .then((res) => res.data)
        .then((res) => {
            setLangDatas(res);
        })
        .catch((err) => {
            console.log("err: ", err);
        })
    }, [languageIndex])
    return (
        <div>
            <Header 
                languageIndex={languageIndex}
                setLanguageIndex={setLanguageIndex}
                layoutName={layoutName}
            />
            {props.children}
            <Text 
            text={langDatas.one}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '40px', margin: '85px 40px 160px 40px' }}>
                <Link href="/products/과일">
                    <Button src="/images/fruit.png" alt="fruit category" text={langDatas.two} onClick={() => console.log('btn 1')}/>
                </Link>
                <Link href="/products/채소">
                    <Button src="/images/vegi.png" alt="vigetable category" text={langDatas.three} onClick={() => console.log('btn 2')}/>
                </Link>
                <Link href="/products/정육-계란">
                    <Button src="/images/chicken.png" alt="meat&eggs category" text={langDatas.four} onClick={() => console.log('btn 3')}/>
                </Link>
                <Link href="/products/수산">
                    <Button src="/images/seafood.png" alt="seafood category" text={langDatas.five} onClick={() => console.log('btn 4')}/>
                </Link>
                <Link href="/products/쌀-견과">
                    <Button src="/images/rice.png" alt="rice&nuts category" text={langDatas.six} onClick={() => console.log('btn 5')}/>
                </Link>
                <Link href="/products/우유-유제품">
                    <Button src="/images/milk.png" alt="milk&daily products category" text={langDatas.seven} onClick={() => console.log('btn 6')}/>
                </Link>
                <Link href="/products/간식">
                    <Button src="/images/snack.png" alt="snack category" text={langDatas.eight} onClick={() => console.log('btn 7')}/>
                </Link>
                <Link href="/products/소스-오일">
                    <Button src="/images/sauce.png" alt="sauce&oil category" text={langDatas.nine} onClick={() => console.log('btn 8')}/>
                </Link>
                <Link href="/products/선물류">
                    <Button src="/images/gift.png" alt="gift category" text={langDatas.ten} onClick={() => console.log('btn 9')}/>
                </Link>
            </div>
        </div>
    )
}
