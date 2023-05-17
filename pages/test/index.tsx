import Header from "@/components/Header";
import { PayGuideTextList } from "@/data/payGuideTextList";
import { CartListState } from "@/state/CartListState"
import { LanguageIndexState } from "@/state/LanguageIndexState";
import { totalPriceState } from "@/state/totalPriceState";
import { CartType } from "@/types/CartType";
import { useEffect, useState } from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil"

export default function Test() {
    const [testList, setTestList] = useRecoilState(CartListState);
    const recoilValue = useRecoilValue(CartListState);

    const [tPrice, setTPrice] = useRecoilState(totalPriceState);
    const totalPrice = useRecoilValue(totalPriceState);
    const [languageIndex, setLanguageIndex] = useRecoilState(LanguageIndexState);
    const [payGuideTextList, setPayGuideTextList] = useState<string[]>(PayGuideTextList);

    useEffect(() => {
        console.log("recoilValue: ", recoilValue);
        console.log("reset recoil CartListState");
        console.log("totalPrice from recoil: ", totalPrice);
        console.log("tPrice from recoil: ", tPrice);
        console.log("languageIndex: ", languageIndex);
        setTestList([]);
    }, [])
    return(
        <div>
            <RecoilRoot>
                <Header />    
            </RecoilRoot>
            <h3>
                {
                    payGuideTextList && payGuideTextList[languageIndex]
                }
            </h3>
        </div>
    )
}