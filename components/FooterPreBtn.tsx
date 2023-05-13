import router, { useRouter } from 'next/router';
import React from 'react'
import style from './FooterPreBtn.module.css';
import Image from 'next/image'
import Link from 'next/link'

export default function FooterPreBtn() {

  return (
    <footer className={style.footerMenu}>
        <div className={style.pre_btn}>
            <nav>
                <ul onClick={() => router.back()}>
                    <li>
                        <Image
                            src="/images/arrowLeft.png"
                            alt="arrowLeft"
                            className={style.arrowLeft}
                            width={41}
                            height={41}
                        />
                    </li>
                    <li>
                        이전단계
                    </li>
                </ul>
            </nav>
        </div>
    </footer>
  )
}
