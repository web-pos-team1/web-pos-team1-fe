import React from 'react';
import NumberInput from './NumberInput';
import Image from 'next/image';
import style from './PhoneNumber.module.css'

const GiftCardNumber: React.FC = () => {
  return (
    <div className={style.topWrap}>
      <h1>모바일 상품권</h1>
      <p>상품권의 일련번호를 입력해 주세요</p>
      <NumberInput />
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
  );
};

export default GiftCardNumber;
