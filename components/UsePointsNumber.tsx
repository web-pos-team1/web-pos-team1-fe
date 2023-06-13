import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import style from './UsePointsNumber.module.css';
import axios from 'axios';
import { mapToBE } from './globalfunctions/mapToBE';
import { UserLoginState } from '@/state/UserLoginState';
import { useRecoilState } from 'recoil';
import UsePointsNumberInput from './UsePointsNumberInput';
import PointsLimit from './AlertModal/PointsLimit';
import UsePoints from './AlertModal/UsePoints';
import UsePointsLimit from './AlertModal/UsePointsLimit';
import { formatMoney } from './globalfunctions/formatMoney';
import { totalPriceState } from '@/state/totalPriceState';

export default function UsePointsNumber(
  props: {
    usePointsNumber: string,
    setUsePointNumber: Dispatch<SetStateAction<string>>,
    isUsePoint: boolean
    setIsUSePoint: Dispatch<SetStateAction<boolean>>,
    onClose: Dispatch<SetStateAction<boolean>>
  }) {

  const [showPointsLimit, setShowPointsLimit] = useState<boolean>(false);
  const [showUsePoints, setShowUsePoints] = useState<boolean>(false);
  const [showUsePointsNumberLimit, setShowUsePointsLimit] = useState<boolean>(false);
  const [usePointsNumber, setUsePointsNumber] = useState<string>('');
  const [userLoginState, setUserLoginState] = useRecoilState(UserLoginState);
  const [points, setPoints] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

  const handleUsePointsOn = () => { // 확인 버튼 눌렀을 때
    
      // if (res.status === 200) {
      //   setShowUsePoints(true)
      //   setUserLoginState(true)
      // } else if (res.status === 400) {
      //   setShowPointsLimit(true)
      //   setUserLoginState(true)
      // } else (res.status === 401) {
      //   setShowUsePointsLimit(true)
      //   setUserLoginState(true)
      // }
      props.setIsUSePoint(!props.isUsePoint)
      props.setUsePointNumber(usePointsNumber);

      props.onClose(false);
  
  };

  useEffect(() => {
    console.log("userLoginState: ", userLoginState);
    console.log("usePointsNumber: ", usePointsNumber);
    let req_url =  mapToBE(`/api/v1/point/use`);
    let req_data = {
      "userId": 1
    }
    axios({
      url: req_url,
      method: 'post',
      data: req_data
    })
    .then((res) => {
      console.log("handleUsePoints() / res: ", res);
      console.log("handleUsePoints() / res.status: ", res.status);
      setPoints(res.data.pointAmount);
      // props.setUsePointNumber(res.data.pointAmount);
    })
    .catch((err) => {
    console.log('handleUsePoints() / err: ', err);
    })
  }, [userLoginState])

  return (
    <div className={style.topWrap}>
      <h1>포인트 사용</h1>
      <p>사용할 포인트를 입력해주세요</p>
      <div className={style.totalPrice}>
        <ul>
          <li>최종 결제금액</li>
          <li>₩{formatMoney(totalPrice)}</li>
        </ul>
      </div>
      <div className={style.pointAmount}>
        <ul>
          <li>보유포인트</li>
          <li>{points}p</li>
        </ul>
      </div>
      <UsePointsNumberInput
        usePointsNumber={usePointsNumber}
        setUsePointsNumber={setUsePointsNumber}
        userPoints={points}
      />      
      <div className={style.caution}>
      <p>*10p 이상 사용 가능</p>
      </div>

        <div className={style.confirmBtn}>
          <PointsLimit show={showPointsLimit} onClose={setShowPointsLimit}/>
          <UsePoints show={showUsePoints} onClose={setShowUsePoints}/>
          <UsePointsLimit show={showUsePointsNumberLimit} onClose={setShowUsePointsLimit}/>
          
          <Image 
            src="/images/checkPurple.png"
            alt="confirm button"
            width={30}
            height={30}
            />
          <p onClick={handleUsePointsOn}>
            확인
          </p>
        </div>
      
    </div>
  );
};
