import { Dispatch, SetStateAction } from "react";
import style from "./CallStaffModal.module.css"
import Image from 'next/image'

export default function CallStaffModal(props:{show:boolean, onClose:Dispatch<SetStateAction<boolean>>}) {


    if(!props.show) return null
    
    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <div className={style.title}>
                    <p>직원 호출</p>    
                </div>
                <div className={style.body}>
                    <p><span>확인</span>버튼을 누르면 직원호출이 취소됩니다 <br/> 직원이 올때까지 기다려주세요</p>
                </div>
                <div className={style.footer}>
                    <button onClick={()=>props.onClose(false)}>
                        <Image
                            src="/images/checkPurple.png"
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