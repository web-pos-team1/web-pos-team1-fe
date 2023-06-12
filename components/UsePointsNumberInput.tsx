import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import Image from 'next/image';
import style from './UsePointsNumberInput.module.css'
import { useRecoilState } from 'recoil';
import { UserLoginState } from '@/state/UserLoginState';
import { mapToBE } from './globalfunctions/mapToBE';
import axios from 'axios';

type Props = {
  usePointsNumber: string,
  setUsePointsNumber: Dispatch<SetStateAction<string>>
}

const UsePointsNumberInput: React.FC<Props> = (
  {
    usePointsNumber,
    setUsePointsNumber
  }
) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [userLoginState, setUserLoginState] = useRecoilState(UserLoginState);
    const [points, setPoints] = useState<number>(0);
  
    const handleNumberClick = (value: number) => { 
      if (inputValue.length < 8 )  {
        const newValue = usePointsNumber + value;
        setInputValue(newValue);
        setUsePointsNumber(newValue);
      }
    }; 
  
    const handleClearClick = () => {
      setInputValue('');
      setUsePointsNumber('');
    };
  
    const handleDeleteClick = () => {
      setInputValue((prevValue) => prevValue.slice(0, -1));
      setUsePointsNumber((prevValue) => prevValue.slice(0, -1));
    };
  
    const handleUsePointsAll = () => {
      setInputValue(points.toString());
      // setUsePointsNumber('전체사용');
    };

    useEffect(() => {
      console.log("userLoginState: ", userLoginState);
      console.log("usePointsNumber: ", usePointsNumber);
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
  
  export default UsePointsNumberInput;