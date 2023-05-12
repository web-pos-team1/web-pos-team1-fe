import { Dispatch, SetStateAction } from "react"
import style from "./Modal.module.css"
import LanguageButton from "@/components/LanguageButton"
import Image from 'next/image'

// interface Props {
//     onClick: () => void;
// }

export default function Modal(props:{show:boolean, onClose:Dispatch<SetStateAction<boolean>>}) {

    // console.log(props.show)

    if(!props.show) return null
    
    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <div className={style.title}>
                    <p>언어선택</p>
                </div>
                <div className={style.body}>
                    <LanguageButton src="/images/southKorea.png" alt="Korean" onClick={() => console.log('btn 1')}/>
                    <LanguageButton src="/images/UKFlag.png" alt="English" onClick={() => console.log('btn 2')}/>
                    <LanguageButton src="/images/japanFlag.png" alt="Japanese" onClick={() => console.log('btn 3')}/>
                    <LanguageButton src="/images/chinaFlag.png" alt="Chinese" onClick={() => console.log('btn 4')}/>
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