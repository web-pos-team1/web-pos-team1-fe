import React, { useEffect, useState } from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Text3Button from "../Text3Button";
import { useRecoilState } from "recoil";
import { totalPriceState } from "@/state/totalPriceState";
// import style from "./CustomImg.module.css";

interface Props {
  children: React.ReactNode;
}

const PaymentsLayout: React.FC<Props> = ({ children }) => {
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

  const buttons = [
    {
      src: "/images/creditCard.png",
      alt: "credit cart payment",
      text1: "신용/체크카드",
      onClick: () => console.log("btn 1"),
    },
    {
      src: "/images/mobilePayyy.png",
      alt: "mobile pay payment",
      text1: "모바일페이",
      onClick: () => console.log("btn 2"),
    },
    {
      src: "/images/barcode.png",
      alt: "sensing barcode payments",
      text1: "SSGPAY",
      text2: "카카오페이",
      text3: "스마일페이",
      onClick: () => console.log("btn 3"),
    },
    {
      src: "/images/internationalPayments.png",
      alt: "international payments",
      text1: "은련카드",
      text2: "위챗페이",
      text3: "알리페이",
      onClick: () => console.log("btn 4"),
    },
  ];

  return (
    <>
    <div>
      <Header />
      <Location />
      {children}
      <Text text="결제 방식을 선택해 주세요" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridGap: "82px",
          margin: "90px 180px 160px 180px",
        }}
      >
        {buttons.map((button, index) => (
          <Text3Button
            key={index}
            src={button.src}
            alt={button.alt}
            text1={button.text1}
            text2={button.text2}
            text3={button.text3}
            onClick={button.onClick}
          />
        ))}
      </div>
        <Footer 
          totalPrice={totalPrice}
        />
    </div>
    </>
  );
};

export default PaymentsLayout;
