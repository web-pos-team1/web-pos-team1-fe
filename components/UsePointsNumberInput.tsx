import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import Image from 'next/image';
import style from './UsePointsNumberInput.module.css'
import { useRecoilState } from 'recoil';
import { UserLoginState } from '@/state/UserLoginState';
import { mapToBE } from './globalfunctions/mapToBE';
import axios from 'axios';
import UsePointsLimit from './AlertModal/UsePointsLimit';
import UsePoints from './AlertModal/UsePoints';

// type Props = {
//   usePointsNumber: string,
//   setUsePointsNumber: Dispatch<SetStateAction<string>>,
//   userPoints: number
// }

export default function UsePointsNumberInput(
  props: {
    usePointsNumber: string,
    setUsePointsNumber: Dispatch<SetStateAction<string>>,
    userPoints: number
  }
) {
    const [inputValue, setInputValue] = useState<string>('');
    const [userLoginState, setUserLoginState] = useRecoilState(UserLoginState);
    const [points, setPoints] = useState<number>(0);
    const [showUsePointsLimit, setShowUserPointsLimit] = useState<boolean>(false);
    const [showUsePoints, setShowUserPoints] = useState<boolean>(false);
  
    const handleNumberClick = (value: number) => { 
        const newValue = props.usePointsNumber + value;
        if (Number(newValue) > props.userPoints) {
          setShowUserPointsLimit(true);
          return;
        }
        setInputValue(newValue);
        // setUsePointsNumber(newValue);
      } 
  
    const handleClearClick = () => {
      setInputValue('');
      props.setUsePointsNumber('');
    };
  
    const handleDeleteClick = () => {
      setInputValue((prevValue) => prevValue.slice(0, -1));
      props.setUsePointsNumber((prevValue) => prevValue.slice(0, -1));
    };
  
    const handleUsePointsAll = () => {
      let point = Math.floor(points/10); // 10p 단위로 사용가능
      console.log("point: ", point);
      setInputValue((point * 10).toString());
      props.setUsePointsNumber((point * 10).toString()); 
      // setUsePointsNumber('전체사용');
    };

    useEffect(() => {
      console.log("UserPointNumberInput/useEffect()/userLoginState: ", userLoginState);
      console.log("UserPointNumberInput/useEffect()/props.usePointsNumber: ", props.usePointsNumber);
      let req_url = mapToBE(`/api/v1/point/use`);
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
      })
      .catch((err) => {
      console.log('handleUsePoints() / err: ', err);
      })
    }, [userLoginState])

    return (
      <div className={style.phoneWrap}>
        {/* point 정상 처리 */}
        <UsePoints show={showUsePoints} onClose={setShowUserPoints} />
        {/* 초과된 포인트 사용불가 */}
        <UsePointsLimit show={showUsePointsLimit} onClose={setShowUserPointsLimit} />
        <input type="text" value={inputValue} readOnly 
        placeholder='사용포인트 입력'
        />
        <div className={style.useAll}>
          <button onClick={() => handleUsePointsAll()}>전체사용</button>
          </div>
        <div className={style.NumberPad}>
          <button onClick={() => handleNumberClick(1)}>1</button>
          <button onClick={() => handleNumberClick(2)}>2</button>
          <button onClick={() => handleNumberClick(3)}>3</button>
          <button onClick={() => handleNumberClick(4)}>4</button>
          <button onClick={() => handleNumberClick(5)}>5</button>
          <button onClick={() => handleNumberClick(6)}>6</button>
          <button onClick={() => handleNumberClick(7)}>7</button>
          <button onClick={() => handleNumberClick(8)}>8</button>
          <button onClick={() => handleNumberClick(9)}>9</button>
          <button onClick={handleClearClick}>C</button>
          <button onClick={() => handleNumberClick(0)}>0</button>
          <button onClick={handleDeleteClick}>
            <Image
              src="/images/deleteNumber.png"
              alt="delete each number"
              width={30}
              height={30}
            />
          </button>
        </div>
      </div>
    );
  };
  