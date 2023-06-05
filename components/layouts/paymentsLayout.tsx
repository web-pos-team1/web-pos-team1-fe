import React, { useEffect, useState } from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Text3Button from "../Text3Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { totalPriceState } from "@/state/totalPriceState"; 
import axios from 'axios';
import { RequestPayParams, RequestPayResponse } from "iamport-typings";
import { mapToBE } from "../globalfunctions/mapToBE";
import { PayObjectState } from "@/state/PayObjectState";
import style  from "./paymentsLayout.module.css";
import Image from 'next/image';
import UsePointsNumberModal from "../UsePointsNumberModal";
import { IBM_Plex_Sans_KR } from "next/font/google";

interface Props {
  children: React.ReactNode;
}

const initialState: RequestPayParams = {
  pay_method: "card", // card, samsung(kcp일 경우)
  pg: "nice", // nice(신용카드), kcp(samsung pay 가능), kakaopay
  merchant_uid: process.env.NEXT_PUBLIC_ENV_STORE_ID ?? "1234",
  name: 'test-payment', // ex. 사과외 2건
  amount: 1000, // 결제금액
  buyer_tel: "010-0000-0000"
};

const IMP_UID = process.env.NEXT_PUBLIC_ENV_IMP_UID ?? "imptest9298";

const PaymentsLayout: React.FC<Props> = ({ children }) => {
  const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

  const [params, setParams] = useState<RequestPayParams>(initialState);
  const [result, setResult] = useState<RequestPayResponse>();
  const [showUsePointsNumberModal, setShowUsePointsNumberModal] = useState<boolean>(false);
  const [usePoints, setUsePoints] = useState<boolean>(false);
  const [finalTotalPrice, setFinalTotalPrice] = useRecoilState<number>(totalPriceState);
  const payObjectState = useRecoilValue(PayObjectState);

  const { IMP } = window;

  let payData = initialState;

  const handleUsePointsOff = () => {
    setUsePoints(false);
  };
  
  const handleUsePointsOn = () => {
    setUsePoints(true);
  };

  const handleModal = () => {
    setShowUsePointsNumberModal(true)
  }
  

  const handleCreditCartBtnClick = () => {
    console.log("0. 신용/체크카드 선택");
    if (IMP) {
      IMP.init(IMP_UID);
      console.log("[credit card] success to init IMP: ", IMP);
      console.log("==start to request pay==")
      
      payData['pg'] = "nice";
      payData['pay_method'] = "card";
      payData['amount'] = totalPrice;
      
      console.log("payData: ", payData);
      
      // 결제 가이드 로띠().then()

      IMP.request_pay(payData, onPaymentAccepted); // 이니시스 결제 모달

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
      payData['amount'] = totalPrice;

      console.log("payData: ", payData);
      IMP.request_pay(payData, onPaymentAccepted);

    } else {
      alert("결제를 진행할 수 없습니다. 다시 시도해주시기 바랍니다.");
    }

    
  }
  const handleSimplePayBtnClick = () => {
    console.log("2. 카카오 페이 선택");
    if (IMP) {
      IMP.init(IMP_UID);
      console.log("[simplePay] success to init IMP: ", IMP);
      console.log("==start to request pay==");
      payData['pg'] = "kakaopay";
      payData['pay_method'] = "card";
      payData['amount'] = totalPrice;

      console.log("payData: ", payData);

      IMP.request_pay(payData, onPaymentAccepted);
    } else {
      alert("결제를 진행할 수 없습니다. 다시 시도해주시기 바랍니다.");
    }
  }

  
  const onPaymentAccepted = (res: RequestPayResponse) => {
    console.log("res after request_pay: ", res);
    setResult(res);
    if (res.success) {
        let data = {
            'posId' : process.env.NEXT_PUBLIC_ENV_POS_ID,
            'storeId': process.env.NEXT_PUBLIC_ENV_STORE_ID,
            'success': true,
            'error_msg': "결제 성공했습니다.",
            'img_uid': IMP_UID,
        };
        const url = mapToBE(`/api/v1/payment/callback-receive`);
        // const url = `http://localhost:8080/api/v1/payment/callback-receive`;
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
        payData['merchant_uid'] = makeUID();
    }
  }
  const makeUID = () => {
    const date = new Date();
    let storeId = process.env.NEXT_PUBLIC_ENV_STORE_ID;
    if (storeId && Number(storeId) < 10) {
      storeId = '0' + storeId;
    };
    let posId = process.env.NEXT_PUBLIC_ENV_POS_ID;
    if (posId && Number(posId) < 10) {
      posId = '0' + posId;
    }
    let timeList = date.toTimeString().split(' ')[0].split(':'); // ['13', '56', '15'] -> [시, 분, 초]
    const retUID = 
    date.getFullYear() + "" + Number(date.getMonth()) + 1 + "" + date.getDate() + "" + timeList[0] + timeList[1] + timeList[2] + "" + storeId + posId
    
    return retUID;
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
      text1: "카카오페이",
      onClick: () => handleSimplePayBtnClick(),
    },
  ];
  useEffect(() => {
    console.log("paymentLayouts / useEffect()");
    setParams({...params, amount: finalTotalPrice});
    // ** 이름은 recoil에 장바구니 찾아서  list.size()참고해서 짜자 **  
    payData['merchant_uid'] = makeUID();
  }, [])

  return (
    <>
    <div>
    <UsePointsNumberModal show={showUsePointsNumberModal} onClose={setShowUsePointsNumberModal} />
    <div>
      <Header />
      <Location />
      {children}
      <div className={style.text}>
      <div className={style.step}>STEP01</div>
      <p>신세계포인트를 사용여부를 선택해 주세요</p>
      </div>

      <div className={style.points}>
        <div onClick={handleUsePointsOff} className={!usePoints ? style.selected : style.notSelected}>
          <ul>
            <li>
              <span>
                <Image
                  src="/images/pointDefault.png"
                  alt="use point default"
                  className={style.default}
                  width={70}
                  height={70}
                  />
              </span>
              </li>
              <li>사용 안함</li>
            </ul>
          </div>

          <div onClick={handleUsePointsOn} className={usePoints ? style.selected : style.notSelected}>
            <ul onClick={handleModal}>
              <li>
              <Image
                src="/images/mainLogo.png"
                alt="use point"
                className={style.usePoint}
                width={70}
                height={70}
                />
                </li>
                <li>사용</li>
              </ul>
          </div>
      </div>

      <div className={style.text}>
      <div className={style.step}>STEP02</div>
      <p>결제 방식을 선택해 주세요</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "40px",
          marginTop: "20px",
          marginBottom: "52px",
        }}
      >
        {buttons.map((button, index) => (
          <Button
            key={index}
            src={button.src}
            alt={button.alt}
            text={button.text1}
            onClick={button.onClick}
          />
        ))}
      </div>

      <div className={style.discount}>
        <ul>
          <li>총 주문 금액</li>
          <li><span>₩ 12,000</span></li>
          <li>총 할인 금액</li>
          <li><span>₩ 950</span></li>
        </ul>
      </div>

        <Footer 
          totalPrice={totalPrice}
        />
    </div>
    </div>
    </>
  );
};

export default PaymentsLayout;
