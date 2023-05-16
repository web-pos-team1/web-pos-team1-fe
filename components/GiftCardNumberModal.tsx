import { Dispatch, SetStateAction } from "react";
import style from "./PhoneNumberModal.module.css";
import Image from 'next/image';
import Link from 'next/link';
import GiftCardNumber from "./GiftCardNumber";

export default function GiftCardNumberModal(props:{show:boolean, onClose:Dispatch<SetStateAction<boolean>>}) {


    if(!props.show) return null
    
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
                

                <div className={style.body}>
                    <GiftCardNumber />
                </div>

                
            </div>
        </div>
    )
}