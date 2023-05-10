import { useRouter } from 'next/router';
import React, { useState } from 'react';
import style from './Location.module.css';

export default function Location() {

  const [activeIndex, setActiveIndex] = useState(0); // 초기 선택한 index를 0으로 설정

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={style.wrapper}>
      <nav>
        <ul>
          <li
            className={activeIndex === 0 ? style.active : ''}
            onClick={() => handleItemClick(0)}
          >
            1 상품등록
          </li>
          <li
            className={activeIndex === 1 ? style.active : ''}
            onClick={() => handleItemClick(1)}
          >
            2 포인트적립
          </li>
          <li
            className={activeIndex === 2 ? style.active : ''}
            onClick={() => handleItemClick(2)}
          >
            3 배송/선물
          </li>
          <li
            className={activeIndex === 3 ? style.active : ''}
            onClick={() => handleItemClick(3)}
          >
            4 결제
          </li>
          <li
            className={activeIndex === 4 ? style.active : ''}
            onClick={() => handleItemClick(4)}
          >
            5 완료
          </li>
        </ul>
      </nav>
    </div>
  );
}


