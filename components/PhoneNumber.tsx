import React from 'react';
import NumberInput from './NumberInput';
import Image from 'next/image';
import style from './PhoneNumber.module.css'

const PhoneNumber: React.FC = () => {
  return (
    <div className={style.topWrap}>
      <h1>신세계포인트</h1>
      <p>전화번호를 입력해 주세요</p>
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

export default PhoneNumber;
