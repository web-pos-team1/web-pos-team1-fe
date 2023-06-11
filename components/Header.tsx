import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import style from './Header.module.css';
import Image from 'next/image'
import Link from 'next/link'
import HeaderButton from "@/components/HeaderButton";
import { transeData } from '@/data/translations';
import Modal from "@/components/Modal";
import CallStaffModal from './CallStaffModal';
import { countryImg } from '@/data/countryImg';
import { PayObjectState } from '@/state/PayObjectState';
import axios from 'axios';
import { callStaffImg } from '@/data/callStaffImg';
import { Board, Led } from 'johnny-five';
// import Board from './globalfunctions/board';
// import Led from './globalfunctions/led';

type Button = {
  id: number,
  src: string,
  alt: string,
  link: string,
  onClick: any
} 

export default function Header(
  props: {
    languageIndex?: number,
    setLanguageIndex?: Dispatch<SetStateAction<number>>,
    layoutName?: string 
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
  const handleCallStaff = () => {
    setShowCallStaffModal (true);
    console.log("cal staff clicked!!");
  
    // const board = new Board();
    // board.on("ready", () => {
    //   const led = new Led(5);
    //   led.blink(500);
    // });
  }

  useEffect(()=>{
    console.log("Header's useEffect() / props.languageIndex: ", props.languageIndex);
    const url = `http://localhost:8080/api/v1/translation/${props.languageIndex}/${props.layoutName}`;
    axios.get(url)
    .then((res) => setTitle(res.data.one))
    .catch((err) => console.log("Hader/useEffect()/err: ", err));

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
          src: callStaffImg[props.languageIndex ? props.languageIndex : 0], 
          alt: "call staff",
          link: "/",
          onClick: () => handleCallStaff()
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
    </>
  )
}

