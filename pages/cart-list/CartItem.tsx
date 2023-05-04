import React, { useState, useEffect } from "react";
import axios from 'axios';
import { CartType } from "@/types/CartType";

export default function CartItem(
    props: {
        item: CartType,
        delCheck : boolean, 
        setDelCheck : any, 
        totalPrice : number, 
        setTotalPrice : any
    }) 
    {
    const [count, setCount] = useState(1);
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
        <div>
            <img src={props.item.image_url} />
            <h3>{props.item.name}</h3>
            <h3>{props.item.price}</h3>
            <button onClick={minusCount}>-</button>
            <span>{count}</span>
            <button onClick={plusCount}>+</button>
            <button onClick={delCart}>x</button>    
        </div>
    )
}