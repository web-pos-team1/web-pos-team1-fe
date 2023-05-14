import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import style from './GiftModal.module.css'

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
          <p>선물 받을 분의 정보를 입력해 주세요</p>
        </div>

        <div className={style.inputBox}>
          <p>이름</p>
          <input type="text" />
        </div>

        <div className={style.PhoneInputBox}>
        {/* <div className={style.inputBox}> */}
          <p>연락처</p>
          <input type="text" />
        </div>

        <div className={style.confirmBtn}>
          <Image 
            src="/images/checkPurple.png"
            alt="confirm button"
            width={30}
            height={30}
            />
          <p>확인</p>
          </div>
      </div>
    </div>
  );
};
