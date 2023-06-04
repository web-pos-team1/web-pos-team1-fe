import { Dispatch, SetStateAction } from "react";
import style from "./PhoneMatchAlertModal.module.css";
import Image from 'next/image';

export default function PhoneMismatch(props:{show:boolean, onClose:Dispatch<SetStateAction<boolean>>}) {


    if(!props.show) return null
    
    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <div className={style.body}>
                    <p>회원으로 등록되지 않은 번호입니다</p>
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
                        <p onClick={()=>props.onClose(false)}>
                            확인
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
}