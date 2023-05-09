import { CartType } from "@/types/CartType";
import Image from "next/image";
import { useState, useEffect } from "react";
import style from "./Cart.module.css";

export default function Cart(
    props: {
        item: CartType,
        delCheck : boolean, 
        setDelCheck : any, 
        totalPrice : number,
        setTotalPrice : any
    }) {
    const [count, setCount] = useState<number>(1);
    const minusCount = () => {
        if (count === 1) {
            alert("최소 수량은 1개입니다.");
            return;
        }
        setCount(count - 1);
    }
    const plusCount = () => {
        setCount(count + 1);
    }
    const delCart = () => {
        if (window.confirm("장바구니에서 삭제하시겠습니까?")) {
            console.log("---장바구니에서 삭제하는 로직---")
        } else {
            console.log("---삭제 취소---");
        }
    }
    useEffect(() => {
        console.log("props: ", props);
    }, [])
    return (
        <div className={style.cartItemWrap}>
            <div className={style.productImgContainer}>                
                <img 
                 src={props.item.image_url}
                />
            </div>
            <div className={style.cartCount}>
                {props.item.cartQty}
            </div>
            <div>
                <p>{props.item.name}</p>
            </div>
            
            <span className={style.cartDelBtn} onClick={delCart}>x</span>   
    
        </div>
    )
}