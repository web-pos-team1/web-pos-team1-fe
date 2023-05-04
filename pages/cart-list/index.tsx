import React, { useState, useEffect } from "react";
import axios from "axios";
import { CartType } from "@/types/CartType";
import styles from '@/styles/Carts.module.css'
import CartItem from "./CartItem";
import Link from 'next/link'

import data from '../../data/productsAndCarts.json';

export default function CartList() {

    const [cartList, setCartList] = useState<CartType[]>([]);
    const [delCheck, setDelCheck] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartId, setCartId] = useState();

    let tPrice = 0;

    const calTotalPrice = (arr:any) => {
        tPrice = 0;
        for(let i = 0; i < arr.length; i++) {
            tPrice += (arr[i].price * arr[i].qty);
        }
        setTotalPrice(tPrice);
    }


    useEffect(() => {
        const url = 'http://localhost:3001/carts';
        axios.get(url)
        .then((res : any) => {
            console.log(res);
            setCartList(res.data);
            calTotalPrice(res.data);
        })
        .catch((err) => console.log("err: ", err));

    }, [])
    return(
        <>
        <h3>장바구니 리스트</h3>
        {
            cartList.map((item, index) => (
                <CartItem
                    key={index}
                    item={item}
                    delCheck={delCheck}
                    setDelCheck={setDelCheck}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                />
            ))
        }
        <div className={styles.pre_btn}>
            <Link href={`/products/과일`}>
                <button>이전단계</button>
            </Link>
        </div>
        </>
    );
}