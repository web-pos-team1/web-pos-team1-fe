import { useRouter } from 'next/router';
import React from 'react'
import style from './Header.module.css';
import Image from 'next/image'
// import { languageImg, callStaffImg, staffImg, headerMenu } from '../data/headerMenu'
import Link from 'next/link'
import HeaderButton from "@/components/HeaderButton";
import translations from '../data/translations.json'

export default function Header() {

    const router = useRouter();
    // const title = router.pathname.split('/')[1];
    const title = translations[router.pathname] ?? '신세계';

    const buttons = [
      {
          src: "/images/southKorea.png", 
          alt: "select languages", 
          onClick: () => console.log('btn 1')
      },
      {
          src: "/images/callStaff.png", 
          alt: "call staff",  
          onClick: () => console.log('btn 2')
      },
      {
          src: "/images/staffIcon.png", 
          alt: "staff menu", 
          onClick: () => console.log('btn 3')
      }
  ];

  return (
    <header className={style.headerMenu}>
      
      <div className={style.logoBox}>
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
      </div>

      <div>
        {buttons.map((button, index) => (
                      <HeaderButton 
                          key={index} 
                          src={button.src} 
                          alt={button.alt}  
                          onClick={button.onClick} 
                      />
                  ))}
      </div>
    </header> 
  )
}
