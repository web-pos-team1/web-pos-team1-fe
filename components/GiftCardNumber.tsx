import React from 'react';
import GiftCardNumberInput from './GiftCardNumberInput';
import Image from 'next/image';
import style from './PhoneNumber.module.css'
import Link from 'next/link';

const GiftCardNumber: React.FC = () => {
  return (
    
    <div className={style.topWrap}>
      <h1>모바일 상품권</h1>
      <p>상품권의 일련번호를 입력해 주세요</p>
      <GiftCardNumberInput />
      <Link href="/payments">
      <div className={style.confirmBtn}>
        <Image 
          src="/images/checkPurple.png"
          alt="confirm button"
          width={30}
          height={30}
          />
        <p>확인</p>
      </div>
      </Link>
    </div>
  );
};

export default GiftCardNumber;
