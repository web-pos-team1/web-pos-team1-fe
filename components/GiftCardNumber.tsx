import React from 'react';
import GiftCardNumberInput from './GiftCardNumberInput';
import Image from 'next/image';
import style from './PhoneNumber.module.css'
import Link from 'next/link';
import { mapToBE } from './globalfunctions/mapToBE';
import axios from 'axios';
import GiftCardMatch from './AlertModal/GiftCardMatch';
import GiftCardNotExist from './AlertModal/GiftCardNotExist';

const GiftCardNumber: React.FC = () => {
  
  const [showGiftCardExpired, setShowGiftCardExpired] = React.useState<boolean>(false)
  const [showGiftCardMatch, setShowGiftCardMatch] = React.useState<boolean>(false)
  const [showGiftCardNotExist, setShowGiftCardNotExist] = React.useState<boolean>(false)
  const [showGiftCardOverPrice, setShowGiftCardOverPrice] = React.useState<boolean>(false)
  const [giftCardNumber, setGiftCardNumber] = React.useState<string>('')

  const handleGiftCardMatch = () => {

  console.log("giftCardNumber: ", giftCardNumber);
  let req_url = mapToBE(`/api/v1/giftCard/check`);
  let req_data = {
      'storeId': process.env.NEXT_PUBLIC_ENV_STORE_ID,
      'posId': process.env.NEXT_PUBLIC_ENV_POS_ID,
      "giftCardMethod": "giftCardNumber",
      "giftCardNumber": giftCardNumber
    }
    axios({
      url: req_url,
      method: 'post',
      data: req_data
    })
    .then((res) => {
      console.log("handleGiftCardMatch() / res: ", res);
      if (res.status === 200) {
        setShowGiftCardMatch(true)
      }
    })
    .catch((err) => {
      console.log('handleGiftCardMatch() / err: ', err);
      setShowGiftCardNotExist(true);
      return;
    })
  }

  return (
    
    <div className={style.topWrap}>
      <h1>모바일 상품권</h1>
      <p>상품권의 일련번호를 입력해 주세요</p>
      <GiftCardNumberInput 
        giftCardNumber={giftCardNumber}
        setGiftCardNumber={setGiftCardNumber}
      />
      <Link href="/payments">
      <div className={style.confirmBtn}>
        <GiftCardMatch show={showGiftCardMatch} onClose={setShowGiftCardMatch} />
        <GiftCardNotExist show={showGiftCardNotExist} onClose={setShowGiftCardNotExist} />
        <Image 
          src="/images/checkPurple.png"
          alt="confirm button"
          width={30}
          height={30}
          />
        <p onClick={handleGiftCardMatch}>확인</p>
      </div>
      </Link>
    </div>
  );
};

export default GiftCardNumber;
