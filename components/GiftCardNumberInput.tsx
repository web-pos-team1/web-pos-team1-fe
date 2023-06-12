import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import style from './NumberInput.module.css'

interface Props {
  serialNumber: string,
  setSerialNumber: Dispatch<SetStateAction<string>>
}

const GiftCardNumberInput: React.FC<Props> = (
  {
    serialNumber, 
    setSerialNumber
  }) => {
    const [inputValue, setInputValue] = useState<string>('');
  
    const handleNumberClick = (value: number) => {

      if (inputValue.length < 13) {
        // const newValue = inputValue + value;
        const newValue = serialNumber + value;
        setSerialNumber(newValue);
        setInputValue(newValue);
      }
    };
  
    const handleClearClick = () => {
      setInputValue('');
      setSerialNumber('');
    };
  
    const handleDeleteClick = () => {
      setInputValue((prevValue) => prevValue.slice(0, -1));
      setSerialNumber((prevValue) => prevValue.slice(0, -1));
    };

    return (
      <div className={style.phoneWrap}>
        {/* <input type="text" value={inputValue} readOnly  placeholder='모바일 쿠폰 번호를 입력해 주세요 />*/}
        <input type='text' value={serialNumber} readOnly 
          placeholder=''
        />

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
  
  export default GiftCardNumberInput;