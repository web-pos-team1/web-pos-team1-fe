import { Dispatch, SetStateAction } from "react";
import style from "./PhoneMatchAlertModal.module.css";
import Image from 'next/image';
import Link from "next/link";

export default function PhoneMatch(props:{show:boolean, onClose:Dispatch<SetStateAction<boolean>>}) {


    if(!props.show) return null
    
    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <div className={style.body}>
                    <Image
                        src="/images/header_logo.png"
                        alt="main Logo"
                        className={style.logo}
                        width={40}
                        height={40}
                    />
                    <p>고객님 반갑습니다</p>
                </div>
                <div className={style.footer}>
                    <Link href="/ssg-service">
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
                    </Link>
                </div>
            </div>
        </div>
    )
}