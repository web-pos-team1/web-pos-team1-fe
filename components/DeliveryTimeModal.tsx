import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import style from './DeliveryTimeModal.module.css'
import Link from 'next/link';

export default function DeliveryTimeModal(props:{show:boolean, onClose:Dispatch<SetStateAction<boolean>>}) {

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
          <h1>배송 시간선택</h1>
          <hr/>
        </div>

        <div className={style.body}>
        <p><input type="radio"/>11:00 ~ 14:00</p>
        <hr />
        <p><input type="radio"/>12:00 ~ 15:00</p>
        <hr />
        <p><input type="radio"/>13:00 ~ 16:00</p>
        <hr />
        <p><input type="radio"/>14:00 ~ 17:00</p>
        <hr />
        <p><input type="radio"/>15:00 ~ 18:00</p>
        <hr />
        <p><input type="radio"/>16:00 ~ 19:00</p>
        <hr />
        <p><input type="radio"/>17:00 ~ 20:00</p>
        <hr />
        </div>

      <Link href="/payments">
        <div className={style.confirmBtn}>
          <Image 
            src="/images/checkWhite.png"
            alt="confirm button"
            width={30}
            height={30}
            />
          <p>선택하기</p>
          </div>
      </Link>
      </div>
    </div>
  );
};
