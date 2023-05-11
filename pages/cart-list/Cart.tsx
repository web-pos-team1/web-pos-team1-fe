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
    const [cartList, setCartList] = useState<CartType[]>(() => {
        const cList = isLocalStorageAvailable() ? localStorage.getItem('cartList') : null;
        return cList !== null ? JSON.parse(cList) : [];
    });

  
    const handleDelCartBtnClick = () => {
        if (window.confirm("장바구니에서 삭제하시겠습니까?")) {
            props.setDelProductId(props.item.product_id);
        }
    }
    useEffect(() => {
        console.log("props: ", props);
    }, [cartList])
    return (
        <div className={style.cartItemWrap}>
            <div className={style.productImgContainer}>                
                <img src={props.item.image_url}/>
            </div>
            <div className={style.cartCount}>
                {props.item.cartQty}
            </div>
            {/* <div>
                <p style={{ width: "110px", margin: "0px", wordWrap:"break-word"}}>{props.item.name}</p>
            </div>
            */}
            
            <span className={style.cartDelBtn} onClick={handleDelCartBtnClick}>x</span>
    
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
