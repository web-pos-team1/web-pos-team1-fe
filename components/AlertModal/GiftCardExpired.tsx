import { Dispatch, SetStateAction } from "react";
// import style from "./AlertModal.module.css";
import style from './GiftCardValidAlertModal.module.css';
import Image from 'next/image';

export default function GiftCardExpired(
    props: {
        show: boolean, 
        onClose: Dispatch<SetStateAction<boolean>>,
        setSerialNumber: Dispatch<SetStateAction<string>>,
    }) {

    const handleExpiredAlertModalConfirmBtnClick = () => {
        props.onClose(false);
        props.setSerialNumber('');
    }

    if(!props.show) return null
    
    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <div className={style.body}>
                    <p>만료된 상품권입니다</p>
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
                        <p onClick={handleExpiredAlertModalConfirmBtnClick}>확인</p>
                        </button>
                </div>
            </div>
        </div>
    )
}