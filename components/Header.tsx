import { useRouter } from 'next/router';
import React from 'react'
import style from './Header.module.css';
import Image from 'next/image'
import { languageImg, callStaffImg, staffImg, headerMenu } from '../data/headerMenu'
import Link from 'next/link'

export default function Header() {

    const router = useRouter();
    const title = router.pathname.split('/')[1];

  return (
    <header className={style.headerMenu}>
      
      
      <Image
          src="/images/header_logo.png"
          alt="main Logo"
          className={style.logo}
          width={80}
          height={80}
        />

      <h1 className={style.title}>
        {title === '' ? '신세계':title}
      </h1>

      <nav>
        <ul>
          {
          headerMenu.map ( menu => (
          <li key={menu.id}>
            <Link href={menu.path}>
              <img src={menu.icon} alt={menu.title}/>
            </Link>
          </li>
          ))
          }
          {/* <li>
            <Image
            src="/images/languageIcon.png"
            alt="language"
            className={style.language}
            width={90}
            height={90}
            />
          </li>
          <li>
            <Image
              src="/images/callStaffIcon.png"
              alt="callStaff"
              className={style.callStaff}
              width={80}
              height={80}
            />
          </li>
          <li>
          <Image
              src="/images/staffIcon.png"
              alt="staff"
              className={style.staff}
              width={70}
              height={70}
            />
          </li> */}
        </ul>
      </nav>
    </header>
  )
}
