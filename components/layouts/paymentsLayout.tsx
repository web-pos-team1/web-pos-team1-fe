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
import axios from 'axios';
import { RequestPayParams, RequestPayResponse } from "iamport-typings";

interface Props {
  children: React.ReactNode;
}

const initialState: RequestPayParams = {
  pay_method: "card",
  pg: "nice",
  merchant_uid: process.env.NEXT_PUBLIC_ENV_STORE_ID ?? "1234",
  name: 'test-payment', // ex. 사과외 2건
  amount: 1, // 결제금액
  buyer_tel: "010-0000-0000",
};
const IMP_UID = process.env.NEXT_PUBLIC_ENV_IMP_UID ?? "imptest9298";

const PaymentsLayout: React.FC<Props> = ({ children }) => {
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

  const [params, setParams] = useState<RequestPayParams>(initialState);
  const [result, setResult] = useState<RequestPayResponse>();

  const [finalTotalPrice, setFinalTotalPrice] = useRecoilState<number>(totalPriceState);

  const { IMP } = window;

  let payData = initialState;

  const handleCreditCartBtnClick = () => {
    console.log("0. 신용/체크카드 선택");
    if (IMP) {
      IMP.init(IMP_UID);
      console.log("[credit card] success to init IMP: ", IMP);
      console.log("==start to request pay==")
      
      payData['pg'] = "nice";
      payData['pay_method'] = "card";
      
      console.log("payData: ", payData);

      IMP.request_pay(payData, onPaymentAccepted);
    } else {
      alert("결제를 진행할 수 없습니다. 다시 시도해주시기 바랍니다.");
    }
  }
  
  const handleMobilePayBtnClick = () => {
    console.log("1. 모바일페이 선택");
    if (IMP) {
      IMP.init(IMP_UID);
      console.log("[mobilePay] success to init IMP: ", IMP);
      console.log("==start to request pay==")
      payData['pg'] = "kcp";
      payData['pay_method'] = "samsung";
      console.log("payData: ", payData);
      IMP.request_pay(payData, onPaymentAccepted);

    } else {
      alert("결제를 진행할 수 없습니다. 다시 시도해주시기 바랍니다.");
    }

    
  }
  const handleSimplePayBtnClick = () => {
    console.log("2. SSG, 카카오, 스마일 페이 선택");
    if (IMP) {
      IMP.init(IMP_UID);
      console.log("[simplePay] success to init IMP: ", IMP);
      console.log("==start to request pay==");
      payData['pg'] = "kakaopay";
      payData['pay_method'] = "card";
      
      console.log("payData: ", payData);

      IMP.request_pay(payData, onPaymentAccepted);
    } else {
      alert("결제를 진행할 수 없습니다. 다시 시도해주시기 바랍니다.");
    }
  }

  const handleForignPayBtnClick = () => {
    console.log("3. 은련카드, 위쳇페이, 알리페이 선택");
    alert("서비스 준비중입니다.");
  }
  
  const onPaymentAccepted = (res: RequestPayResponse) => {
    console.log("res after request_pay: ", res);
    setResult(res);
    if (res.success) {
        let data = {
            'posId': process.env.NEXT_PUBLIC_ENV_POS_ID,
            'storeId': process.env.NEXT_PUBLIC_ENV_STORE_ID,
            'success': true
        }
        const url = `http://localhost:8080/api/v1/payment/callback-receive`;
        const headers = {
        'content-type': 'application/json'
        };
        axios(
        url,
        {
            headers: headers,
            method: 'post',
            data: data
        }
        )
        .then((res: any) => {
        console.log("res after request_pay(): ", res );
        })
        .catch((err: any) => {
        console.log("err after reqeust_pay(): ", err);
        })
    } else {
        alert("결제 실패했습니다. 다시 시도해주시기 바랍니다.");
    }
  }

  const buttons = [
    {
      src: "/images/creditCard.png",
      alt: "credit cart payment",
      text1: "신용/체크카드",
      onClick: () => handleCreditCartBtnClick(),
    },
    {
      src: "/images/mobilePayyy.png",
      alt: "mobile pay payment",
      text1: "모바일페이",
      onClick: () => handleMobilePayBtnClick(),
    },
    {
      src: "/images/barcode.png",
      alt: "sensing barcode payments",
      text1: "SSGPAY",
      text2: "카카오페이",
      text3: "스마일페이",
      onClick: () => handleSimplePayBtnClick(),
    },
    {
      src: "/images/internationalPayments.png",
      alt: "international payments",
      text1: "은련카드",
      text2: "위챗페이",
      text3: "알리페이",
    //   text: "은련카드\n위챗페이\n알리페이",
      onClick: () => handleForignPayBtnClick(),
    //   className: style.image
    },
  ];
  useEffect(() => {
    console.log("paymentLayouts / useEffect()");
    setParams({...params, amount: finalTotalPrice});
    // 이름은 recoil에 장바구니 찾아서  list.size()참고해서 짜자

  }, [])

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
