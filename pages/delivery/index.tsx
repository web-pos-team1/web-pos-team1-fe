import Header from "@/components/Header";
import Location from "@/components/Location";
import React, { useState, useEffect } from "react";
import Text from "@/components/Text";
import style from './delivery.module.css';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import Link from "next/link";


export default function Delivery(props: {children: React.ReactNode}) {
    const [name, setName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
    const [detailAddress, setDetailAddress] = useState<string>("");
    const [postCode, setPostCode] = useState<string>("");

    const modalStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "800px",
            height: "350px",
            padding: "0",
            overflow: "hidden",
        },
    };

    const toggleAddress = () => {
        setIsOpenAddress(true);
    }
    const cancelToggleAddress = () => {
        setIsOpenAddress(false);
    }

    const completeHandler = (data : any) =>{
        console.log("data from Daum: ", data);
        setAddress(data.roadAddress);
        setPostCode(data.zonecode);
        setIsOpenAddress(false); 
    }

    return (
        <div>
            <Header />
            <Location />
            {props.children}
            <Text text="배송지 입력" />
            <div style={{ }}>
                <label style={{ fontSize: "22px" }}>받는 분: </label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text"/>
            </div>            
            
            <div className={style.phoneNumberDiv}>
                <label style={{ fontSize: "22px" }}>휴대폰 번호: </label>
                <span>
                    <select name="phoneNumberFirst" style={{ width: "50px" }}>
                        <option selected value="010">010</option>
                        <option value="02">02</option>
                        <option value="031">031</option>
                        <option value="043">043</option>
                        <option value="052">052</option>
                        <option value="direct">직접입력</option>
                    </select>
                    {/* <input id="selBoxDirect" name="selBoxDirect" type="text"/> */}

                    <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" style={{ marginLeft: "3px" }}/>
                </span>
            </div>
            <div>
                <label style={{ fontSize: "22px" }}>주소: </label>
                <input className={style.addressInput} value={address} readOnly type="text" onClick={toggleAddress}/>
                <Modal isOpen={isOpenAddress} ariaHideApp={false} style={modalStyles}>
                    <button onClick={cancelToggleAddress}>x</button>
                    <DaumPostcode onComplete={completeHandler} height="100%" />
                </Modal>   
                <input value={postCode} type="text" readOnly placeholder=" 우편번호" onClick={toggleAddress} style={{ width: "60px", marginLeft: "10px", backgroundColor: "#D4D8DB" }} />
            </div>
            <div className={style.detailAddressDiv}>
                <input className={style.detailAddressInput} value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)}  type="text"></input>
            </div>
            
            <span style={{ }}>
                <Link href="/points">
                    <button style={{ padding: "20px", fontSize: "20px", marginRight: "700px", paddingRight: "20px", marginLeft: "20px"}}>
                        취소
                    </button>
                </Link>
                <Link href = '/pay'>
                    <button style={{ padding: "20px", fontSize: "20px"}}>
                        확인
                    </button>
                </Link>
            </span>

        </div>
    );
}