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
    phoneNumber: string,
    address: string,
    postCode: string,
    detailAddress: string,
    requestDeliveryTime: string,
    isConfirm: boolean // DB에 없는 데이터
}

export interface nonMemberDataType {
    userName: string,
    phoneNumber: string,
    address: string,
    postCode: string,
    detailAddress: string,
    requestDeliveryTime: string,
    isConfirm: boolean // DB에 없는 데이터
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
    {/* <CheckAleart
    step={step}
    confirm={confirm}
    setConfirm={setConfirm}
    isInnerModal={isInnerModal}
    setIsInnerModal={setIsInnerModal}
    /> */}

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

            <div>
                <label>받는 분</label>
                <input value={inputData.userName} name='userName' onChange={handleChange} type="text"/>
                <hr/>
            </div>            
            
            <div className={style.phoneNumberDiv}>
                <label>휴대폰 번호</label>
                <span>
                    <input value={inputData.phoneNumber} name='phoneNumber' onChange={handleChange} type="text" placeholder="01012345678" style={{ marginLeft: "3px" }}/>
                </span>
                <hr/>
            </div>

            <div>
                <label>주소</label>
                <input className={style.addressInput} value={inputData.address} readOnly type="text" onClick={toggleAddress}/>
                <Modal isOpen={isDaum} ariaHideApp={false} style={modalStyles}>
                    <button onClick={cancelToggleAddress}>x</button>
                    <DaumPostcode onComplete={completeHandler}/>
                </Modal>   
                <input value={inputData.postCode} type="text" readOnly placeholder=" 우편번호 검색" onClick={toggleAddress} style={{ width: "60px", marginLeft: "10px", backgroundColor: "#D4D8DB" }}/>
                <hr/>
            </div>
            <div className={style.detailAddressDiv}>
                <input className={style.detailAddressInput} value={inputData.detailAddress} onChange={handleChange}  type="text"></input>
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


// const Step03 = (props:{isInnerModal: boolean, setIsInnerModal: React.Dispatch<React.SetStateAction<boolean>>}) => {
//     return (
//         <div onClick={()=>props.setIsInnerModal(true)}>
//             Step03
//         </div>
//     )
