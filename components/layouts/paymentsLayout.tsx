import React from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/Button";
import Text from "@/components/Text";
// import style from "./CustomImg.module.css";

interface Props {
  children: React.ReactNode;
}

const PaymentsLayout: React.FC<Props> = ({ children }) => {
  const buttons = [
    {
      src: "/images/creditCard.png",
      alt: "credit cart payment",
      text: "신용/체크카드",
      onClick: () => console.log("btn 1"),
    },
    {
      src: "/images/mobilePay.png",
      alt: "mobile pay payment",
      text: "모바일페이",
      onClick: () => console.log("btn 2"),
    },
    {
      src: "/images/barcode.png",
      alt: "sensing barcode payments",
      text: "SSGPAY",
    //   text: "SSGPAY\n카카오페이\n스마일페이",
      onClick: () => console.log("btn 3"),
    },
    {
      src: "/images/internationalPayments.png",
      alt: "international payments",
      text: "은련카드",
    //   text: "은련카드\n위챗페이\n알리페이",
      onClick: () => console.log("btn 4"),
    //   className: style.image
    },
  ];

  return (
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
          <Button
            key={index}
            src={button.src}
            alt={button.alt}
            text={button.text}
            onClick={button.onClick}
            // className={button.className}
          />
        ))}
      </div>
      <Link href="/ssgService">
        <Footer />
      </Link>
    </div>
  );
};

export default PaymentsLayout;
