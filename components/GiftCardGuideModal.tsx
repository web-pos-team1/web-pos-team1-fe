import { Dispatch, SetStateAction } from "react";
import style from "./GiftCardGuideModal.module.css";
import Image from 'next/image';
import Link from 'next/link';
import GiftCardNumberModal from "./GiftCardNumberModal";
import React from "react";

export default function GiftCardGuideModal(
    props:
        {   show:boolean,
            onClose:()=>void
    }) {

    const [showGiftCardNumberModal,setShowGiftCardNumberModal] = React.useState<boolean>(false);

    const handleGiftCardNumberModal = () => {
        setShowGiftCardNumberModal(true)
    };

    if(!props.show) return null

    return (
        <div className={style.overlay}>
            <div className={style.modal}>    
                <div className={style.cancel}>
                    <button  onClick={()=>props.onClose()}>
                        <Image
                            src="/images/cancel.png"
                            alt="cancel"
                            className={style.cancel}
                            width={30}
                            height={30}
                        />
                    </button>
                </div>
                
                <div className={style.title}>
                    <p>상품권 사용</p>    
                </div>

                <div className={style.body}>
                    <p>모바일 상품권을 사용하시겠습니까? <br/> <span>초과된 금액은 사용하실 수 없습니다</span></p>
                </div>

                <div className={style.footer}>
                    <div>

                    <button>
                        <Image
                            src="/images/checkWhite.png"
                            alt="confirm"
                            className={style.conirm}
                            width={28}
                            height={28}
                        />
                        <p onClick={() => props.onClose()}>
                            예
                        </p>
                    </button>

                    </div>
                    
                <Link href='/payments'>
                    <button>
                        <Image
                            src="/images/nopeWhite.png"
                            alt="confirm"
                            className={style.reject}
                            width={28}
                            height={28}
                        />
                        <p>아니오</p>
                    </button>
                </Link>

                </div>
            </div>
        </div>
    )
}