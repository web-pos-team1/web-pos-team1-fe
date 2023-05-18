import { Dispatch, SetStateAction } from "react";
import style from "./CartDelModal.module.css";
import Image from 'next/image';
import Link from 'next/link';

export default function CartDelModal(props:
    { show:boolean, 
      onClose:Dispatch<SetStateAction<boolean>>,
      setDelState: Dispatch<SetStateAction<boolean>>
    }) {

    if(!props.show) return null
    const handleYesClick = () => {
        props.setDelState(true);
        props.onClose(false);
    }
    const handleNoClick = () => {
        props.setDelState(false);
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
                    <p>장바구니 삭제</p>    
                </div>

                <div className={style.body}>
                    <p>해당 상품을 삭제하시겠습니까?</p>
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
                        <p onClick={handleYesClick}>
                            예
                        </p>
                    </button>
                
                    <button>
                        <Image
                            src="/images/nopeWhite.png"
                            alt="confirm"
                            className={style.reject}
                            width={28}
                            height={28}
                        />
                        <p onClick={handleNoClick}>
                            아니오
                        </p>
                    </button>

                </div>
            </div>
        </div>
    )
}