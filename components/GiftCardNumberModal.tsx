import { Dispatch, SetStateAction } from "react";
import style from "./GiftCardNumberModal.module.css";
import Image from 'next/image';
import Link from 'next/link';
import GiftCardNumber from "./GiftCardNumber";
import React from "react";
import { mapToBE } from "./globalfunctions/mapToBE";

export default function GiftCardNumberModal(
    props: {
        show:boolean, 
        onClose:Dispatch<SetStateAction<boolean>>,
        serialNumber: string,
        setSerialNumber: Dispatch<SetStateAction<string>>,
        handleCheckGiftCardNumber: ()=>void
    }) {

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
                    <GiftCardNumber 
                        serialNumber={props.serialNumber}
                        setSerialNumber={props.setSerialNumber}
                        handleCheckGiftCardNumber={props.handleCheckGiftCardNumber}
                    />
                </div>

                
            </div>
        </div>
    )
}