import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from 'axios';
import { CartType } from "@/types/CartType";
import { formatMoney } from "@/components/globalfunctions/formatMoney";
import Image from "next/image";
import style from "./CartItem.module.css";
import { ProductType } from "@/types/ProductType";
import CartDelModal from "@/components/AlertModal/CartDelModal";
import CartQtyLimitModal from "@/components/AlertModal/CartQtyLimitModal";

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
        totalOriginPrice: number,
        setTotalOriginPrice: Dispatch<SetStateAction<number>>
    }) 
    {
    const [cartQty, setCartQty] = useState<number>(props.item.cartQty);
    const [showCartDelModal, setShowCartDelModal] = useState<boolean>(false);
    const [delState, setDelState] = useState<boolean>(false);
    const [qtyLimitState, setQtyLimitState] = useState<boolean>(false);
    const [showcartQtyLimitModal, setShowCartQtyLimitModal] = useState<boolean>(false);

    const minusCount = () => {
        if (cartQty === 1) {
            setShowCartQtyLimitModal(true);
            // alert("최소 수량은 1개입니다.");
            return;
        }
        setCartQty(cartQty - 1);
        for (let i = 0; i < props.cartList.length; i++) {
            if (props.cartList[i].product_id === props.item.product_id) {
                props.cartList[i].cartQty -= 1;
                break;
            }
        }
        props.setCartList([...props.cartList]);
        props.setTotalPrice(props.totalPrice - props.item.price);
        props.setTotalOriginPrice(props.totalOriginPrice - props.item.origin_price);
    }
    const plusCount = () => {
        setCartQty(cartQty + 1);
        for (let i = 0; i < props.cartList.length; i++) {
            if (props.cartList[i].product_id === props.item.product_id) {
                props.cartList[i].cartQty += 1;
                break;
            }
        }
        props.setCartList([...props.cartList]);
        props.setTotalPrice(props.totalPrice + props.item.price);
        props.setTotalOriginPrice(props.totalOriginPrice + props.item.origin_price);
    }
    const handleDelBtnClick = (cart : CartType) => {
        console.log("삭제할 product: ", cart);
        setShowCartDelModal(true);
        // if (window.confirm("장바구니에서 삭제하시겠습니까?")) {
        //     console.log("---장바구니에서 삭제하는 로직---");
        // } else {
        //     console.log("---삭제 취소---");
        // }
    }
    useEffect(() => {
        console.log("props: ", props);
        if (delState) {
            props.setDelProductId(props.item.product_id);
        }
    }, [delState])
    return (
        <>
            <CartDelModal 
                show={showCartDelModal}
                onClose={setShowCartDelModal}
                setDelState={setDelState}
            />
            <CartQtyLimitModal
                show={showcartQtyLimitModal}
                onClose={setShowCartQtyLimitModal}
                setQtyLimitState={setQtyLimitState}
            />

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
        </>
        
    )
}