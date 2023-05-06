import React from 'react'
import style from './Location.module.css';

export default function Location() {
  return (
    <div className={style.wrapper}>
        <nav>
            <ul>
                <li>1 상품등록</li>
                <li>2 포인트적립</li>
                <li>3 배송/선물</li>
                <li>4 결제</li>
                <li>5 완료</li>
            </ul>
        </nav>
    </div>
  )
}
