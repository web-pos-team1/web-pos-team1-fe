import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import Image from 'next/image';
import style from './DeliveryModal.module.css'
import Link from 'next/link';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import DeliveryTimeModal from './DeliveryTimeModal';

export default function DeliveryModal(props:{show:boolean, onClose:Dispatch<SetStateAction<boolean>>}) {

  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isOpenAddress, setIsOpenAddress] = useState<boolean>(false);
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [postCode, setPostCode] = useState<string>("");
  const [showDeliveryTimeModal, setShowDeliveryTimeModal] = useState<boolean>(false);

    if(!props.show) return null

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

  const showDeliveryTimeModalHandler = () => {
    setShowDeliveryTimeModal(true);
  }

  return (

    <div className={style.overlay}>
      <div className={style.modal}>
        <div className={style.cancel}>
          <button  onClick={()=>props.onClose(false)}>
            <Image
              src="/images/cancel.png"
              alt="cancel"
              className={style.cancel}
              width={30}
              height={30}
            />
          </button>
        </div>

        <div className={style.title}>
          <h1>배송지 입력</h1>
          <hr />
        </div>

        <div className={style.body}>
          <div className={style.inputBox}>
                <label>배송지명</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text"/>
          </div>
          <hr />

          <div className={style.nameInputBox}>
                <label>받는 분</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text"/>
          </div>
          <hr />

          <div className={style.phoneInputBox}>
            <label>연락처</label>

            <span>
              <select name="phoneNumberFirst">
                <option selected value="010">010</option>
                <option value="02">02</option>
                <option value="031">031</option>
                <option value="043">043</option>
                <option value="052">052</option>
                <option value="direct">직접입력</option>
              </select>

            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text"/>
            </span>
          </div>
          <hr />

          <div className={style.addressInputBox}>
                <label>주소</label>
                <input className={style.addressInput} value={address} readOnly type="text" onClick={toggleAddress}/>
                <Modal isOpen={isOpenAddress} ariaHideApp={false}>
                    <button onClick={cancelToggleAddress}>x</button>
                    <DaumPostcode onComplete={completeHandler} />
                </Modal>   
                <input value={postCode} type="text" readOnly placeholder="우편번호 검색" onClick={toggleAddress} style={{ width: "60px", marginLeft: "10px", backgroundColor: "#D4D8DB" }} />
            </div>
            <div className={style.detailAddressDiv}>
                <input className={style.detailAddressInput} value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)}  type="text"></input>
            </div>
        </div>
        <hr />

        <div className={style.footer}>
        <input type="checkbox" id="cb1"/>
    <label for="cb1">[필수] 배송정보 수집이용에 동의 합니다.</label>
    </div>

    <div className={style.information}>
      <label>
        <nav>
          <ul>
            <li>수집주체 : 신세계</li>
            <li>수입목적 : 주문정보고지 및 상품배송</li>
            <li>수집항목 : 수령인 성명, 수령인 휴대전화번호(집 전화번호), 배송지 주소</li>
            <li>보유이용기간 : 배송완료 후 5년. (단, 배송지 목록에 등록할 경우 회원 탈퇴 혹은 정보 삭제 시까지)</li>
            <li>귀하는 개인정보 수집이용에 동의를 거부할 수 있습니다. 다만 이에 대한 동의를 하지 않을 경우 상품 배송이 제한됨을 알려드립니다.</li>
          </ul>
          </nav>
        </label>
      </div>

      <div className={style.detailInformation}>
        <label>
          <nav>
            <ul>
              <li>*상품배송을 위해서 필요한 최소한의 개인정보이므로 동의를 해 주셔야 서비스를 이용하실 수 있습니다.</li>
              <li>*상품배송은 수탁사를 통해 이루어지며, 배송수탁사는 개인정보처리방침에서 확인하실 수 있습니다.</li>
            </ul>
          </nav>
        </label>
      </div>

      <button>취소</button>
      {/* <Link href="/payments"> */}
      <DeliveryTimeModal show={showDeliveryTimeModal} onClose={setShowDeliveryTimeModal}/>
        <div onClick={showDeliveryTimeModalHandler} className={style.confirmBtn}>
          <Image 
            src="/images/checkPurple.png"
            alt="confirm button"
            width={30}
            height={30}
            />
          <p>확인</p>
          </div>
      {/* </Link> */}
      </div>
    </div>
  );
};
