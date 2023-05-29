import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import style from './GiftModal.module.css'
import Link from 'next/link';

export default function GiftModal(props:{show:boolean, onClose:Dispatch<SetStateAction<boolean>>}) {

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
          <h1>선물하기</h1>
        </div>

        <div className={style.body}>
          <p>정보를 입력해 주세요</p>
        </div>

        <div className={style.senderInputBox}>
          <p>보내는 분</p>
          <input type="text" placeholder='이름을 입력해주세요'/>
        </div>

        <div className={style.inputBox}>
          <p>받는 분</p>
          <input type="text" placeholder='이름을 입력해주세요'/>
        </div>

        <div className={style.PhoneInputBox}>
        {/* <div className={style.inputBox}> */}
          <p>받는 분 연락처</p>
          <input type="text" placeholder='01012345678' />
        </div>

      <Link href="/payments">
        <div className={style.confirmBtn}>
          <Image 
            src="/images/checkWhite.png"
            alt="confirm button"
            width={30}
            height={30}
            />
          <p>확인</p>
          </div>
      </Link>
      </div>
    </div>
  );
};
