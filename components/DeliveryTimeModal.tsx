import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import style from './DeliveryTimeModal.module.css'
import Link from 'next/link';
import { deliveryTimeList } from '@/data/deliveryTimeList';
import { DeliveryTimeType } from '@/types/DeliveryTimeType';

export default function DeliveryTimeModal(props:{show:boolean, onClose:Dispatch<SetStateAction<boolean>>}) {

    if(!props.show) return null

    const [showGiftCardGuideModal, setShowGiftCardGuideModal] = useState<boolean>(false);
    const [finishedAt, setFinishedAt] = useState<string>('');
  
    const handleModal = () => {
      setShowGiftCardGuideModal(true);
      console.log("finishedAt : ", finishedAt);
    };
    const handleSelectDeliveryTime = (event : any) => {
      setFinishedAt(event.target.value);
    }

  return (
    <>
    <div className={style.overlay}>
      <div className={style.modal}>
        <div className={style.cancel}>
          <button onClick={()=>props.onClose(false)}>
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
          <h1>배송 시간선택</h1>
          <hr/>
        </div>

      <div className={style.deliveryTimeList}>
        <form>
          {
            deliveryTimeList && deliveryTimeList.map((time:DeliveryTimeType, index:number) => 
            {
              if (index < 4) {
                return(
                  <div key={time.id}>
                    <div className={style.disabled}>
                      <input 
                        type='radio' 
                        name="delivery" 
                        value={time.title}
                        onChange={handleSelectDeliveryTime}
                      />
                    {time.title}2
                  </div>
                <hr/>
                </div>
                )
              } else {
                return(
                  <div key={time.id}>
                  <label>
                    <input 
                      type='radio' 
                      name="delivery" 
                      value={time.title}
                      onChange={handleSelectDeliveryTime}
                    />
                    {time.title}3
                  </label>
                <hr/>
                </div>
                )
              }
            })}
        </form>
      </div>

        <div className={style.confirmBtn}>
          <Image 
            src="/images/checkWhite.png"
            alt="confirm button"
            width={30}
            height={30}
            />
            <p onClick={handleModal}>선택하기</p>
          </div>
      </div>
    </div>
    </>
  );
};
