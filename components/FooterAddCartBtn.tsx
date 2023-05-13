import router, { useRouter } from 'next/router';
import React from 'react'
import style from './FooterAddCartBtn.module.css';
import Image from 'next/image'
import Link from 'next/link'

export default function FooterAddCartBtn() {

  return (
    <footer className={style.footerMenu}>
        <div className={style.next_btn}>
            <nav>
                <ul>
                    <li>
                        상품등록
                    </li>
                    <li>
                        <Image
                            src="/images/arrowRight.png"
                            alt="arrowRight"
                            className={style.arrowRight}
                            width={41}
                            height={41}
                        />
                    </li>
                </ul>
            </nav>  
        </div>
    </footer>
  )
}
