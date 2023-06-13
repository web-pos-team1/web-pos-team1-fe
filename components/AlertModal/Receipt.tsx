import { Dispatch, SetStateAction } from "react";
import style from "./Receipt.module.css";
import Image from 'next/image';
import { useRouter } from "next/router";

export default function Receipt(props:{show:boolean, onClose:Dispatch<SetStateAction<boolean>>}) {


    if(!props.show) return null

    const router = useRouter();
    
    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <div className={style.body}>
                    <p>신세계 앱으로 전자영수증이 발행되었습니다</p>
                </div>
                <div className={style.footer}>
                    <button>
                        <Image
                            src="/images/checkPurple.png"
                            alt="confirm"
                            className={style.conirm}
                            width={28}
                            height={28}
                        />
                        <p onClick={()=>props.onClose(false)}>확인</p>
                        </button>
                </div>
            </div>
        </div>
    )
}