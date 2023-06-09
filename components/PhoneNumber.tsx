import React, { useEffect, useState } from 'react';
import PhoneNumberInput from './PhoneNumberInput';
import Image from 'next/image';
import style from './PhoneNumber.module.css';
import PhoneMatch from './AlertModal/PhoneMatch';
import PhoneMismatch from './AlertModal/PhoneMismatch';
import axios from 'axios';
import { mapToBE } from './globalfunctions/mapToBE';
import { UserLoginState } from '@/state/UserLoginState';
import { useRecoilState } from 'recoil';
import { BuyerTelState } from '@/state/BuyerTelState';

const PhoneNumber: React.FC = () => {

  const [showPhoneMatch, setShowPhoneMatch] = useState<boolean>(false);
  const [showPhoneMismatch, setShowPhoneMismatch] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [userLoginState, setUserLoginState] = useRecoilState(UserLoginState);
  const [buyerTel, setBuyerTel] = useRecoilState(BuyerTelState);

  const handlePhoneMatch = () => { // 확인 버튼 눌렀을 때
    // setShowPhoneMatch(true)
    console.log("phoneNumber: ", phoneNumber);
    const req_url = mapToBE(`/api/v1/point/add`);
    // const req_url = `http://localhost:8080/api/v1/point/add`;
    const req_data = {
      'storeId': process.env.NEXT_PUBLIC_ENV_STORE_ID,
      'posId': process.env.NEXT_PUBLIC_ENV_POS_ID,
      "pointMethod": "phoneNumber",
      "phoneNumber": phoneNumber
    }
    axios({
      url: req_url,
      method: 'post',
      data: req_data
    })
    .then((res) => {
      console.log("handlePhonMatch() / res: ", res);
      if (res.status === 200) {
        setShowPhoneMatch(true)
        localStorage.setItem("accessToken", res.data.accessToken); // 변수에 저장하도록 refactor 할 예정
        setBuyerTel(phoneNumber)
        setUserLoginState(true)
      }
    })
    .catch((err) => {
      console.log('handlePhonMatch() / err: ', err);
      setShowPhoneMismatch(true);
      setUserLoginState(false)
      return;
    })
  };

  useEffect(() => {
    console.log("userLoginState: ", userLoginState);
  }, [userLoginState])

  return (
    <div className={style.topWrap}>
      <h1>신세계포인트</h1>
      <p>전화번호를 입력해 주세요</p>
      <PhoneNumberInput 
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      
        <div className={style.confirmBtn}>
          <PhoneMatch show={showPhoneMatch} onClose={setShowPhoneMatch}/>
          <PhoneMismatch show={showPhoneMismatch} onClose={setShowPhoneMismatch} />
           <Image 
            src="/images/checkPurple.png"
            alt="confirm button"
            width={30}
            height={30}
            />
          <p onClick={handlePhoneMatch}>
            확인
          </p>
        </div>
    </div>
  );
};

export default PhoneNumber;
