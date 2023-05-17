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
            GnbMenu.map((item:GnbMenuType, index:number)=>{
              return(
                <li 
                  key={index}
                  className={item.path.includes(router.pathname) ? style.active : ''}
                >
                  {item.name}
                </li>
              )
            }) 
          }

        </ul>
      </nav>
    </div>
  );
}


