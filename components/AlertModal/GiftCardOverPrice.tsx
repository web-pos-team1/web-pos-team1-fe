import { Dispatch, SetStateAction } from "react";
// import style from "./AlertModal.module.css";
import style from './GiftCardValidAlertModal.module.css';
import Image from 'next/image';

export default function GiftCardOverPrice(
    props: {
        show: boolean, 
        onClose: Dispatch<SetStateAction<boolean>>,
        setSerialNumber: Dispatch<SetStateAction<string>>,
    }) {

    const handleOverPriceAlertModalConfirmBtnClick = () => {
        props.onClose(false);
        props.setSerialNumber('');
    }
    if(!props.show) return null
    
    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <div className={style.body}>
                    <p>금액이 초과되어 사용할 수 없습니다</p>
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
                        <p onClick={handleOverPriceAlertModalConfirmBtnClick}>확인</p>
                    </button>
                </div>
            </div>
        </div>
    )
}