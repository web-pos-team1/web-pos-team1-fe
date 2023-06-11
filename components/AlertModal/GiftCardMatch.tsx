import { Dispatch, SetStateAction } from "react";
// import style from "./AlertModal.module.css";
import style from "./GiftCardValidAlertModal.module.css";
import Image from 'next/image';
import Link from "next/link";

export default function GiftCardMatch(
    props: {
        show:boolean, 
        onClose:Dispatch<SetStateAction<boolean>>,
        deductedPrice: number
    }) {

    if(!props.show) return null
    
    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <div className={style.body}>
                    <p>입력 완료되었습니다</p>
                </div>
                <div className={style.footer}>
                    <Link href="/payments">
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
                    </Link>
                </div>
            </div>
        </div>
    )
}