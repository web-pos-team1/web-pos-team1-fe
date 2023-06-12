import React, { Dispatch, SetStateAction, useEffect } from "react";
// import style from "./AlertModal.module.css";
import style from "./GiftCardValidAlertModal.module.css";
import Image from 'next/image';
import Link from "next/link";
import { useRecoilState } from "recoil";
import { CouponUseState } from "@/state/CouponUseState";

export default function GiftCardMatch(
    props: {
        show:boolean, 
        onClose:Dispatch<SetStateAction<boolean>>,
        deductedPrice: number
    }) {
    // const [couponUseAmount, setCouponUseAmount] = useRecoilState(CouponUseState);
    if(!props.show) return null
    // useEffect(() => {
    //     setCouponUseAmount(props.deductedPrice);
    // }, [])
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