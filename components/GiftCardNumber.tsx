import React, { useState } from 'react';
import GiftCardNumberInput from './GiftCardNumberInput';
import Image from 'next/image';
import style from './PhoneNumber.module.css'
import Link from 'next/link';
import { mapToBE } from './globalfunctions/mapToBE';
import axios from 'axios';
import GiftCardMatch from './AlertModal/GiftCardMatch';
import GiftCardExpired from './AlertModal/GiftCardExpired';
import GiftCardNotExist from './AlertModal/GiftCardNotExist';
import GiftCardOverPrice from './AlertModal/GiftCardOverPrice';
import GiftCardUsed from './AlertModal/GiftCardUsed';
import { useRecoilState } from 'recoil';
import { totalPriceState } from '@/state/totalPriceState';


const GiftCardNumber: React.FC = () => {

  const [serialNumber, setSerialNumber] = useState<string>('');
  const [giftCardMatchShow, setGiftCardMatchShow] = useState<boolean>(false);
  const [giftCardExpiredShow, setGiftCardExpiredShow] = useState<boolean>(false);
  const [giftCardNotExistShow, setGiftCardNotExistShow] = useState<boolean>(false);
  const [giftCardOverPriceShow, setGiftCardOverPriceShow] = useState<boolean>(false);
  const [giftCardUsedShow, setGiftCardUsedShow] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

  const handleGiftCartNumberMatch = () => {
    console.log("serialNumber: ", serialNumber);
    // let url = mapToBE(`/api/v1/gift-card/valid`);
    let url = `http://localhost:8080/api/v1/gift-card/valid`;
    let reqData = {
      'storeId': process.env.NEXT_PUBLIC_ENV_STORE_ID,
      'posId': process.env.NEXT_PUBLIC_ENV_POS_ID,
      "serialNumber": serialNumber,
    }
    const reqHeaders = {
      'content-type': 'application/json'
    };
    axios(url, {
      headers: reqHeaders,
      method: 'post',
      data: reqData,
    })
    .then((res) => {
      console.log("res: ", res);
      // totalPrice보다 금액이 넘어선 경우
      if (res.data.deducatedPrice > totalPrice) {
        console.log("초과된 금액은 사용할 수 없습니다.");
        setGiftCardOverPriceShow(true);
      } else { // 정상적으로 쿠폰 사용이 가능한 경우
        console.log("유효한 쿠폰입니다.");
        setGiftCardMatchShow(true);
      }
    })
    .catch((err) => {
      console.log("err: ", err);
      console.log("err.request: ", err.request);
      if (err.request.status === 400) {
        console.log("이미 사용된 쿠폰입니다.");
        setGiftCardUsedShow(true);
      } else if (err.request.status === 402) {
        console.log("만료된 쿠폰입니다.");
        setGiftCardExpiredShow(true);
      } else if (err.request.status === 402) {
        console.log("존재하지 않는 쿠폰입니다.");
        setGiftCardNotExistShow(true)
      }
    })
  }

  return (
    
    <div className={style.topWrap}>
      <GiftCardMatch show={giftCardMatchShow} onClose={setGiftCardMatchShow}/>
      <GiftCardExpired show={giftCardExpiredShow} onClose={setGiftCardExpiredShow} />
      <GiftCardNotExist show={giftCardNotExistShow} onClose={setGiftCardNotExistShow} />
      <GiftCardOverPrice show={giftCardOverPriceShow} onClose={setGiftCardOverPriceShow}/>
      <GiftCardUsed show={giftCardUsedShow} onClose={setGiftCardUsedShow}/>
      <h1>모바일 상품권</h1>
      <p>상품권의 일련번호를 입력해 주세요</p>
      <GiftCardNumberInput 
        serialNumber={serialNumber}
        setSerialNumber={setSerialNumber}
      />
      <Link href="/payments">
      <div className={style.confirmBtn}>
        <Image 
          src="/images/checkPurple.png"
          alt="confirm button"
          width={30}
          height={30}
          />
        <p onClick={handleGiftCartNumberMatch}>
          확인
        </p>
      </div>
      </Link>
    </div>
  );
};

export default GiftCardNumber;
