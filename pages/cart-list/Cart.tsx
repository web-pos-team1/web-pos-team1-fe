import { CartType } from "@/types/CartType";
import Image from "next/image";
import { useState, useEffect, Fragment } from "react";
import style from "./Cart.module.css";

export default function Cart(
    props: {
        item: CartType,
        delProductId : number, 
        setDelProductId : any, 
        totalPrice : number,
        setTotalPrice : any
    }) {
    const [count, setCount] = useState<number>(1);
    const [cartList, setCartList] = useState<CartType[]>(() => {
        const cList = isLocalStorageAvailable() ? localStorage.getItem('cartList') : null;
        return cList !== null ? JSON.parse(cList) : [];
    });

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
        let ret = alert("장바구니에서 삭제하시겠습니까?");
        console.log("delCart / ret: ", ret);
        // if () {
        //     console.log("---장바구니에서 삭제하는 로직---")
        // } else {
        //     console.log("---삭제 취소---");
        // }
        let tempCartList = [];
        for (let i = 0; i < cartList.length; i++) {
            if (cartList[i].product_id === props.item.product_id) {
                continue;
            } else {
                tempCartList.push(cartList[i])
            }
        }
        setCartList(tempCartList);
        console.log("cartList after for-loop: ", cartList);
        // localStorage.setItem("cartList", tempCartList);
    }
    useEffect(() => {
        console.log("props: ", props);
    }, [])
    return (
        <div className={style.cartItemWrap}>
            <div className={style.productImgContainer}>                
                <img src={props.item.image_url}/>
            </div>
            <div className={style.cartCount}>
                {props.item.cartQty}
            </div>
            <div>
                <p style={{ width: "110px", margin: "0px", wordWrap:"break-word"}}>{props.item.name}</p>
            </div>
            
            <span className={style.cartDelBtn} onClick={delCart}>x</span>   
    
        </div>
    )
}

function isLocalStorageAvailable() {
    try {
        const testKey = 'test1';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
      } catch (e) {
        console.log("isLocalStorageAvailable / e: ", e);
        return false;
      }
}
