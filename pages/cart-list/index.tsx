import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import { CartType } from '@/types/CartType';
import { withRouter } from 'next/router';
import style from './CartList.module.css';
import Head from 'next/head';
import Layout from '@/components/layouts/layout';
import styles from '@/styles/Carts.module.css';
import Link from 'next/link';
import { NextPageWithLayout } from "../_app";
import { useRouter } from 'next/router';
import Modal from "@/components/Modal";

const CartList : NextPageWithLayout = () => {
    const rt = useRouter();
    
    const [delProductId, setDelProductId] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);

    // const [cartList, setCartList] = useState<CartType[]>(parseCartList);

    const [cartList, setCartList] = useState<CartType[]>(() => {
        const cList = isLocalStorageAvailable() ? localStorage.getItem('cartList') : null;
        return cList !== null ? JSON.parse(cList) : [];
    });

    const handlePayBtnClick = () => {
        console.log("final cartList: ", cartList);
        let data = []
        for (let i = 0; i < cartList.length; i++) {
            data.push({
                "posId": 1,
                "productId": cartList[i].product_id,
                "cartQty": cartList[i].cartQty
            })
        }
        console.log("final response data(List<CartAddDTO>): ", data);
        if (window.confirm("포인트 적립하시겠습니까?")) {
            console.log("rm localStorage['cartList']: ", localStorage.removeItem("cartList"));
            console.log("---포인트 적립 step 페이지 이동---");
        } else {
            console.log("---배송/선물 step 페이지 이동---");
        }     
    }
    const handlePrevBtnClick = () => {
        console.log("CartList / handlePrevBtnClick!!!");
        localStorage.setItem("cartList", JSON.stringify(cartList));
        rt.back();
    }

    useEffect(() => {
        console.log("CartList / delProductId: ", delProductId);
        isLocalStorageAvailable();
        if (delProductId !== 0) {
            let tempCartList = [];
            for (let i = 0; i < cartList.length; i++) {
                if ( cartList[i].product_id === delProductId ) {
                    continue;
                } else {
                    tempCartList.push(cartList[i]);
                }
            }
            console.log("after / tempCartList: ", tempCartList);
            setCartList(tempCartList);
        }
    }, [delProductId])

    const handleModal = () => {
        console.log('modal')
        setShowModal(true)
      }

    return (
        <>
        <Modal show={showModal} onClose={setShowModal} />
        <div>
            <Head>
                <title>POS products list</title>
                <meta name="description" content="Products list page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
                <table className={style.cartTable}>
                    <thead className={style.cartTableHead}>
                            <tr >
                                <th>상품이미지</th>
                                <th>상품명</th>
                                <th>수량</th>
                                <th>단가</th>
                                <th>금액</th>
                                <th>삭제</th>
                            </tr>
                    </thead>
                    <tbody> 
                        {
                            cartList.map((cart: CartType, index: number) => (
                                <CartItem
                                    key={index}
                                    item={cart}
                                    cartList={cartList}
                                    setCartList={setCartList}
                                    delProductId={delProductId}
                                    setDelProductId={setDelProductId}
                                    totalPrice={totalPrice}
                                    setTotalPrice={setTotalPrice}
                                />
                            ))
                        }
                    </tbody>
                </table>
            <span style={{ }}>
                <Link href="/">
                    <button style={{ padding: "20px", fontSize: "20px", marginRight: "700px", paddingRight: "20px", marginLeft: "20px"}}
                     onClick={handlePrevBtnClick}>
                        이전단계
                    </button>
                </Link>
                <Link href = '/cart-list'>
                    
                    <button style={{ padding: "20px", fontSize: "20px"}}
                    onClick={handleModal}>결제하기</button>
                </Link>
            </span>
        </div>
        </>
    )

}

CartList.getLayout = function getLayout(page: React.ReactNode) {
    return(
      <>
        <Layout>
            {page}
        </Layout>
      </>
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

export default CartList;