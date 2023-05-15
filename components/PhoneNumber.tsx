import React from 'react';
import NumberInput from './NumberInput';
import Image from 'next/image';
import style from './PhoneNumber.module.css'
import Link from 'next/link';
import PhoneMatch from './AlertModal/PhoneMatch';
import PhoneMismatch from './AlertModal/PhoneMismatch';

const PhoneNumber: React.FC = () => {

  const [showPhoneMatch, setShowPhoneMatch] = React.useState<boolean>(false);
  const [showPhoneMismatch, setShowPhoneMismatch] = React.useState<boolean>(false);

  const handlePhoneMatch = () => {
    setShowPhoneMatch(true)
  };

  const handlePhoneMismatch = () => {
    setShowPhoneMismatch(true)
  };

  const handlePhoneMatchClose = () => {
    setShowPhoneMatch(false)
  };

  const handlePhoneMismatchClose = () => {
    setShowPhoneMismatch(false)
  };

  return (
    <div className={style.topWrap}>
      <h1>신세계포인트</h1>
      <p>전화번호를 입력해 주세요</p>
      <NumberInput />
      
        <div onClick={handlePhoneMatch} className={style.confirmBtn}>
          <PhoneMatch show={showPhoneMatch} onClose={handlePhoneMatchClose}/>
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
