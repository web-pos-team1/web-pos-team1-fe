import { Dispatch, SetStateAction, useState } from "react";
import style from "./PaperBagModal.module.css";
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from "recoil";
import { totalPriceState } from "@/state/totalPriceState";

export default function RecyclingBagModal(props:{
    show:boolean, 
    onClose:Dispatch<SetStateAction<boolean>>
    }) {

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(850);
    const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);

    if(!props.show) return null

    const handleDeclineQty = () => {
        if (quantity > 1) {
        setQuantity(quantity - 1);
        setPrice(price - 850);
        setTotalPrice(totalPrice - 850);
        }
      };
    
      const handleIncreaseQty = () => {
        setQuantity(quantity + 1);
        setPrice(price + 850);
        setTotalPrice(totalPrice + 850);
      };

      const handleConfirm = () => {
        console.log("price: ", price);
        setTotalPrice(totalPrice + price);
        props.onClose(false);
      };
    
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
                    <p>종량제봉투 구매</p>    
                </div>

                <div className={style.body}>
                    <p>종량제봉투 수량을 입력해 주세요</p>
                </div>

                <div className={style.handler}>
                    <ul>
                        <li>
                            <Image 
                            src="/images/minusHandler.png"
                            alt="decline qty"
                            className={style.decline}
                            width={60}
                            height={60}
                            onClick={handleDeclineQty}
                            />
                        </li>
                        <li>{quantity}</li>
                        <li>
                            <Image 
                            src="/images/plusHandler.png"
                            alt="increase qty"
                            className={style.increase}
                            width={60}
                            height={60}
                            onClick={handleIncreaseQty}
                            />
                        </li>
                    </ul>
                </div>

                <div className={style.amount}>
                    <p>{price}원</p>
                </div>

                <div className={style.footer}>
                    <button>
                        <Image
                            src="/images/checkPurple.png"
                            alt="confirm"
                            className={style.confirm}
                            width={28}
                            height={28}
                        />
                        <p onClick={handleConfirm}>확인</p>
                    </button>
                </div>
            </div>
        </div>
    )
}