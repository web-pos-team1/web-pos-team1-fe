import React, { useState } from 'react';
import Image from 'next/image';
import style from './NumberInput.module.css'

const NumberInput: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
  
    const handleNumberClick = (value: number) => {
      if (inputValue.length < 11) {
        const newValue = inputValue + value;
        const maskedValue = maskNumberAtPosition(newValue, 3, 6);
        setInputValue(maskedValue);
      }
    };
  
    const handleClearClick = () => {
      setInputValue('');
    };
  
    const handleDeleteClick = () => {
      setInputValue((prevValue) => prevValue.slice(0, -1));
    };

    const maskNumberAtPosition = (value: string, start: number, end: number) => {
        const maskedValue = value.split('');
        for (let i = start; i <= end; i++) {
          if (i < maskedValue.length) {
            maskedValue[i] = '*';
          }
        }
        return maskedValue.join('');
      };
  
    return (
      <div className={style.phoneWrap}>
        <input type="text" value={inputValue} readOnly 
     //   placeholder='전화번호를 입력해 주세요'
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
  
  export default NumberInput;