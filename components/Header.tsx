import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import style from './Header.module.css';
import Image from 'next/image'
import Link from 'next/link'
import HeaderButton from "@/components/HeaderButton";
import { transeData } from '@/data/translations';
import Modal from "@/components/Modal";
import CallStaffModal from './CallStaffModal';
import GiftCardNumberModal from './GiftCardNumberModal';
import GiftModal from './GiftModal';
import PhoneNumberModal from './PhoneNumberModal';
import DeliveryModal from './DeliveryModal';
import { useRecoilState } from 'recoil';
import { LanguageIndexState } from '@/state/LanguageIndexState';
import { countryImg } from '@/data/countryImg';
<<<<<<< HEAD
import { PayObjectState } from '@/state/PayObjectState';
=======
import { IBM_Plex_Sans_KR } from 'next/font/google';
>>>>>>> font

type Button = {
  id: number,
  src: string,
  alt: string,
  link: string,
  onClick: any
} 

// const ibmPlexSansKR = IBM_Plex_Sans_KR({
//   subsets: ['latin'],
//   weight: '400',
// });

export default function Header(
  props: {
    languageIndex?: number,
    setLanguageIndex?: Dispatch<SetStateAction<number>>
  }
) {

  const router = useRouter();
  // const title = router.pathname.split('/')[1];
  const pathName  = router.pathname;
  // const title  = translations[pathName] || '신세계';
   
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCallStaffModal, setShowCallStaffModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const [buttons, setButtons] = useState<Button[]>([]);

  const handleModal = () => {
    console.log('modal')
    setShowModal(true)
  }

  useEffect(()=>{
    console.log("Header's useEffect() / props.languageIndex: ", props.languageIndex);
    const res = transeData.filter(item => item.key === pathName)
    if ( res.length > 0 ) {
      setTitle(res[0].value)
    }
    const tempButtons = [
      {
          id: 1,
          src: countryImg[props.languageIndex ? props.languageIndex : 0], 
          alt: "select languages",
          link: "",
          onClick: () => setShowModal(true)
      },
      {
          id: 2,
          src: "/images/callStaff.png", 
          alt: "call staff",
          link: "/",
          onClick: () => setShowCallStaffModal (true)
      },
      {
          id: 3,
          src: "/images/staffIcon.png", 
          alt: "staff menu",
          link: "/",
          onClick: () => console.log('btn 3')
      }
  ];
  setButtons(tempButtons);

  },[pathName, props.languageIndex]);

  return (
    <>
    
    {/* <html lang="ko" className={ibmPlexSansKR.className}> */}
    <Modal 
      show={showModal} onClose={setShowModal} 
      setLanguageIndex={props.setLanguageIndex}
    />
    <CallStaffModal show={showCallStaffModal} onClose={setShowCallStaffModal} />
    <header className={style.headerMenu}>
      
      <div className={style.logoBox}>
        <div className={style.imgWrap}>
        
        <Image
            src="/images/header_logo.png"
            alt="main Logo"
            className={style.logo}
            width={80}
            height={80}
          />
        </div>

      <h1 className={style.title}>
        {title === '' ? '신세계':title}
      </h1>
      </div>

      <ul className={style.btn}>
        {buttons && buttons.map((button, index) => (
          
            button.id === 1 ? 
            <li key={index} onClick={handleModal}>
            <HeaderButton 
                key={index} 
                src={button.src} 
                alt={button.alt}  
            /> 
            </li>
            :

            <li key={index}>
            <HeaderButton 
                key={index} 
                src={button.src} 
                alt={button.alt}  
                onClick={button.onClick}
            />
            </li>
          
         
          ))}
      </ul>
    </header> 
    {/* </html> */}
    </>
  )
}

