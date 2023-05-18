import { Dispatch, SetStateAction } from "react"
import style from "./Modal.module.css"
import LanguageButton from "@/components/LanguageButton"
import Image from 'next/image'

// interface Props {
//     onClick: () => void;
// }

export default function Modal(
    props: {
        show:boolean, 
        onClose:Dispatch<SetStateAction<boolean>>, 
        setLanguageIndex?:Dispatch<SetStateAction<number>>
    }) {

    // console.log(props.show)

    if(!props.show) return null
    const handleClickSouthKoreaClick = () => {
        console.log("SouthKorea Clicked!!")
        props.setLanguageIndex(0);
        props.onClose(false);
    }
    const handleClickUKClick = () => {
        console.log("UK Clicked!!")
        props.setLanguageIndex(1);
        props.onClose(false);
    }
    const handleClickJapanClick = () => {
        console.log("Japan Clicked!!")
        props.setLanguageIndex(2);
        props.onClose(false);
    }
    const handleClickChinaClick = () => {
        console.log("China Clicked!!")
        props.setLanguageIndex(3);
        props.onClose(false);
    }
    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <div className={style.title}>
                    <p>언어선택</p>
                </div>
                <div className={style.body}>
                    <LanguageButton src="/images/southKorea.png" alt="Korean" onClick={handleClickSouthKoreaClick}/>
                    <LanguageButton src="/images/UKFlag.png" alt="English" onClick={handleClickUKClick}/>
                    <LanguageButton src="/images/japanFlag.png" alt="Japanese" onClick={handleClickJapanClick}/>
                    <LanguageButton src="/images/chinaFlag.png" alt="Chinese" onClick={handleClickChinaClick}/>
                </div>
                <div className={style.footer}>
                    <button onClick={()=>props.onClose(false)}>
                        <Image
                            src="/images/checkWhite.png"
                            alt="confirm"
                            className={style.conirm}
                            width={28}
                            height={28}
                        />
                        <p>확인</p>
                        </button>
                </div>
            </div>
        </div>
    )
}