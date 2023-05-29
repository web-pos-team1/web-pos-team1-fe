import { Dispatch, SetStateAction } from "react";
import style from "./CartQtyLimitModal.module.css";
import Image from 'next/image';
import Link from 'next/link';

export default function CartQtyLimitModal(props:
    { show:boolean, 
      onClose:Dispatch<SetStateAction<boolean>>,
      setQtyLimitState: Dispatch<SetStateAction<boolean>>
    }) {

    if(!props.show) return null
    const handleConfirmClick = () => {
        props.setQtyLimitState(true);
        props.onClose(false);
    }

    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                
                <div className={style.cancel}>
                    <button  onClick={()=>props.onClose(false)}>
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
                    <p>최소 수량</p>    
                </div>

                <div className={style.body}>
                    <p>최소 수량은 1개 입니다</p>
                </div>

                <div className={style.footer}>
                
                    <button>
                        <Image
                            src="/images/checkWhite.png"
                            alt="confirm"
                            className={style.conirm}
                            width={28}
                            height={28}
                        />
                        <p onClick={handleConfirmClick}>
                            확인
                        </p>
                    </button>

                </div>
            </div>
        </div>
    )
}