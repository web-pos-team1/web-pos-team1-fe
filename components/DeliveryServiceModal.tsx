import React, { useEffect, useState } from "react";
import style from "./DeliveryServiceModal.module.css";
import Image from 'next/image';
import { deliveryTimeList } from "@/data/deliveryTimeList";
import { DeliveryTimeType } from "@/types/DeliveryTimeType";
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';

export interface inputDataType {
    posId: number,
    storeId: number,
    deliveryAddList: deliveryDataType[]
}

export interface deliveryDataType {
    deliveryName: string,
    userName: string,
    address: string,
    detailAddress: string, // address에 붙여서 back에 보낼 예정
    phoneNumber: string,
    requestDeliveryTime: string,
    postCode: string,
    requestInfo: string
}

export interface nonMemberDataType {
    userName: string,
    address: string,
    detailAddress: string,
    phoneNumber: string,
    requestDeliveryTime: string,
    postCode: string,
    requestInfo: string
}


export default function DeliveryServiceModal(
    props: { 
        isOpen: boolean, 
        setIsOpen: React.Dispatch<React.SetStateAction<boolean>> 
    }) {

const [inputData, setInputData] = useState<nonMemberDataType>({} as nonMemberDataType);

const [step, setStep] = React.useState(0)
const [confirm, setConfirm] = React.useState(false)
const [isInnerModal, setIsInnerModal] = React.useState(false)

const [finishedAt, setFinishedAt] = useState<string>('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData({
        ...inputData,
        [name]: value
    })
}

const innerData = [
    <Step01 
        inputData={inputData}
        handleChange={handleChange}
        setInputData={setInputData}
    />,
    <Step02 finishedAt={finishedAt} setFinishedAt={setFinishedAt} 
    isInnerModal={isInnerModal} setIsInnerModal={setIsInnerModal}/>,
]

useEffect(() => {
    if (confirm) {
        nextStep(step)
    }
}, [confirm, finishedAt])


const nextStep = (step: number) => {
    if (step === 1) {
        props.setIsOpen(false)
        return
    }
    setStep(step + 1)
}

if (!props.isOpen) return null
return (
    <>
    <div className={style.overlay}>
        <div className={style.modal}>
        <div className={style.cancel} onClick={()=>props.setIsOpen(false)}>
            <Image
            src="/images/cancel.png"
            alt="cancel"
            className={style.cancel}
            width={30}
            height={30}
            />
        </div>
            {innerData[step]}
            <div className={style.confirmBtn} onClick={()=>nextStep(step)}>
            <Image 
            src="/images/checkWhite.png"
            alt="confirm button"
            width={30}
            height={30}
            />
            <p>확인</p>
            </div>
        </div>
    </div>
    </>
    )
}

const Step01 = (props:{
    inputData: nonMemberDataType,
    setInputData: React.Dispatch<React.SetStateAction<nonMemberDataType>>,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {

    const { inputData, handleChange, setInputData } = props

    const [isDaum, setIsDaum] = useState<boolean>(false)
    const toggleAddress = () => {
        setIsDaum(true);
    }
    const cancelToggleAddress = () => {
        setIsDaum(false);
    }
    const completeHandler = (data : any) =>{
        console.log("data from Daum: ", data);
        setInputData({
            ...inputData,
            address: data.roadAddress,
            postCode: data.zonecode
        })
        setIsDaum(false);
    }

    const modalStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: "100",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "800px",
            height: "350px",
            padding: "0",
            overflow: "hidden",
        
        }
    };

    return (
        <div>
        <div className={style.title}>
        <h1>배송지 입력</h1>
        <hr/>
        </div>

            <div className={style.name}>
                <p>받는 분</p>
                <input value={inputData.userName} name='userName' onChange={handleChange} type="text"/>
            </div>
            <hr className={style.line}/>
            
            
            <div className={style.phoneNumber}>
                <p>휴대폰 번호</p>
                <input value={inputData.phoneNumber} name='phoneNumber' onChange={handleChange} type="text" placeholder="01012345678" style={{ marginLeft: "3px" }}/>
            </div>
            <hr className={style.line}/>

            <div className={style.address}>
                <p>주소</p>
                <input className={style.addressInput} value={inputData.address} readOnly type="text" onClick={toggleAddress}/>
                <Modal isOpen={isDaum} ariaHideApp={false} style={modalStyles}>
                    <button onClick={cancelToggleAddress}>x</button>
                    <DaumPostcode onComplete={completeHandler}/>
                </Modal>   
                <input className={style.postCode} value={inputData.postCode} type="text" readOnly placeholder=" 우편번호 검색" onClick={toggleAddress} 
                    style={{ width: "141px", 
                            height: "28px", 
                            marginLeft: "10px",
                            paddingLeft: "5px",
                            borderRadius: "#4C304F 3px solid", 
                            fontSize: "20px",
                            color: "#4C304F",
                            backgroundColor: "#D9D9D9",
                            borderRadius: "20px" }}/>
            </div>
            <div className={style.detailAddressDiv}>
                <input className={style.detailAddressInput} value={inputData.detailAddress} onChange={handleChange}  type="text"></input>
            <hr className={style.line}/>
            </div>
            <div className={style.requestInfo}>
                <p>요청사항</p>
                <select name="requestInfo">
                <option selected value="sentence01">선택 안함</option>
                <option value="sentence02">빠른 배송 부탁드립니다</option>
                <option value="sentence03">배송 전, 연락주세요</option>
                <option value="sentence04">부재 시, 휴대폰으로 연락주세요</option>
                <option value="sentence05">부재 시, 경비실에 맡겨주세요</option>
                <option value="sentence06">경비실이 없습니다. 배송 전, 연락주세요</option>
                <option value="sentence07">벨 누르지 말아주세요.</option>
                </select>
            </div>
            <hr className={style.line}/>

            <div className={style.checkBox}>
            <input className={style.checkBoxInput} type="checkbox"/>
            <p><span>[선택]</span> 배송정보 수집이용에 동의 합니다.</p>
            </div>

            <div className={style.description}>
                <ul>
                    <li>수집주체 : 신세계</li>
                    <li>수입목적 : 주문정보고지 및 상품배송</li>
                    <li>수집항목 : 수령인 성명, 수령인 휴대전화번호(집 전화번호), 배송지 주소</li>
                    <li>보유이용기간 : 배송완료 후 5년. (단, 배송지 목록에 등록할 경우 회원 탈퇴 혹은 정보 삭제 시까지)</li>
                    <li>귀하는 개인정보 수집이용에 동의를 거부할 수 있습니다. 다만 이에 대한 동의를 하지 않을 경우 상품 배송이 제한됨을 알려드립니다.</li>
                </ul>
            </div>
            </div>
    )
}

const Step02 = (props:{
    finishedAt: string, 
    setFinishedAt: React.Dispatch<React.SetStateAction<string>>,
    isInnerModal: boolean, setIsInnerModal: React.Dispatch<React.SetStateAction<boolean>>
    }) => {

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        props.setFinishedAt(e.target.value)
    }

    return (
        <div onClick={()=>props.setIsInnerModal(true)}>
        <div>
            <div className={style.title}>
        <h1>배송 시간선택</h1>
        <hr/>
        </div>

    <div className={style.deliveryTimeList}>
        <form>
        {
            deliveryTimeList && deliveryTimeList.map((time:DeliveryTimeType, index:number) => (
            <div key={time.id}>
                <label>
                <input 
                    type='radio' 
                    name="delivery" 
                    value={time.title}
                    onChange={onChangeHandler} 
                />
                {time.title}
                </label>
            <hr/>
            </div>
            ))}
        </form>
    </div>
        </div>
        </div>
    )
}