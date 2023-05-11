import { useRouter } from 'next/router';
import React, { useState } from 'react';
import style from './Location.module.css';
import { GnbMenu } from '@/data/headerMenu';
import { GnbMenuType } from '@/types/GnbMenuType';

export default function Location() {

  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0); // 초기 선택한 index를 0으로 설정

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className={style.wrapper}>
      <nav>
        <ul>
          {
            GnbMenu.map((item:GnbMenuType)=>{
              return(
                <li 
                  onClick={()=>router.push(`${item.path}`)}
                  className={item.path === router.pathname ? style.active : ''}
                >
                  {item.name}
                </li>
              )
            }) 
          }
          {/* <li
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
          </li> */}
        </ul>
      </nav>
    </div>
  );
}


