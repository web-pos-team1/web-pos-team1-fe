import { Dispatch, SetStateAction } from "react";
import style from "./PointGuideModal.module.css";
import Image from 'next/image';
import Link from 'next/link';

export default function PointGuideModal(props:{show:boolean, onClose:Dispatch<SetStateAction<boolean>>}) {


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
                
                <div className={style.title}>
                    <p>포인트 적립</p>    
                </div>

                <div className={style.body}>
                    <p>신세계포인트를 적립하시겠습니까?</p>
                </div>

                <div className={style.footer}>
                <Link href='/points'>
                    <button>
                        <Image
                            src="/images/checkWhite.png"
                            alt="confirm"
                            className={style.conirm}
                            width={28}
                            height={28}
                        />
                        <p>예</p>
                    </button>
                </Link>
                <Link href='/ssg-service'>
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