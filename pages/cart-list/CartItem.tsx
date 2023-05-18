import React, { useState, useEffect } from "react";
import axios from 'axios';
import { CartType } from "@/types/CartType";
import { formatMoney } from "@/components/globalfunctions/formatMoney";
import Image from "next/image";
import style from "./CartItem.module.css";
import { ProductType } from "@/types/ProductType";

export default function CartItem(
    props: {
        item: CartType,
        delProductId : number, 
        setDelProductId : any, 
        totalPrice : number, 
        setTotalPrice : any
        setCartList: any
        cartList: CartType[],
        event: boolean
    }) 
    {
    const [cartQty, setCartQty] = useState<number>(props.item.cartQty);

    const minusCount = () => {
        if (cartQty === 1) {
            alert("최소 수량은 1개입니다.");
            return;
        }
        console.log("before cartQty: ", cartQty);
        setCartQty(cartQty - 1);
        console.log("after cartQty: ", cartQty);
        for (let i = 0; i < props.cartList.length; i++) {
            if (props.cartList[i].product_id === props.item.product_id) {
                props.cartList[i].cartQty -= 1;
                break;
            }
        }
        props.setCartList([...props.cartList]);
        props.setTotalPrice(props.totalPrice - props.item.price);
    }
    const plusCount = () => {
        console.log("before cartQty: ", cartQty);
        setCartQty(cartQty + 1);
        console.log("after cartQty: ", cartQty);
        for (let i = 0; i < props.cartList.length; i++) {
            if (props.cartList[i].product_id === props.item.product_id) {
                props.cartList[i].cartQty += 1;
                break;
            }
        }
        props.setCartList([...props.cartList]);
        props.setTotalPrice(props.totalPrice + props.item.price);
    }
    const handleDelBtnClick = (cart : CartType) => {
        console.log("삭제할 product: ", cart);
        props.setDelProductId(cart.product_id);
        if (window.confirm("장바구니에서 삭제하시겠습니까?")) {
            console.log("---장바구니에서 삭제하는 로직---");
        } else {
            console.log("---삭제 취소---");
        }
    }
    useEffect(() => {
        console.log("props: ", props);
    }, [])
    return (
        <tr className={style.cartItemRow}>
            <td className={style.cartItemName}>
                <Image 
                src={props.item.image_url} width={140} height={140} alt="product image"/>
                <p>{props.item.name}</p>
            </td>
            <td className={style.qtyController}>
                <button onClick={minusCount}>
                    <img src="/images/minus.png" alt="declineQty" />
                </button>

                <span className={style.count}>{cartQty}</span>
                
                <button onClick={plusCount}>
                    <img src="/images/plus.png" alt="increseQty" />
                </button>
            </td>
            <td className={style.cartItemPrice}>
                <p>{formatMoney(props.item.price)}</p>
            </td>
            <td className={style.cartEachPrice}>
                <span>{formatMoney(props.item.price * cartQty)}</span>
            </td>
            <td>
                <span className={style.cartDelBtn} onClick={() => handleDelBtnClick(props.item)}>
                    <img src="/images/deleteBtn.png" alt="cart item delete button" />
                </span>   
            </td>
        </tr>
        
    )
}