import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';
import { CartType } from '@/types/CartType';
import { withRouter } from 'next/router';
import style from './CartList.module.css';
import Image from 'next/image';
import Head from 'next/head';
import { NextPageWithLayout } from "../_app";
import { useRouter } from 'next/router';
import PointGuideModal from '@/components/PointguideModal';
import CartListLayout from '@/components/layouts/cartListLayout';
import { formatMoney } from '@/components/globalfunctions/formatMoney';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CartListState } from '@/state/CartListState';
import axios from 'axios';
import { totalPriceState } from '@/state/totalPriceState';
import { totalOriginPriceState } from '@/state/totalOriginPriceStatet';
import { OrderNameState } from '@/state/OrderNameState';
import { mapToBE } from '@/components/globalfunctions/mapToBE';

const CartList : NextPageWithLayout = () => {
    const rt = useRouter();
    
    const [delProductId, setDelProductId] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalOriginPrice, setTotalOriginPrice] = useState<number>(0);
    const [showPointGuideModal, setShowPointGuideModal] = useState<boolean>(false);
    const [orderName, setOrderName] = useRecoilState<string>(OrderNameState);

    // const [cartList, setCartList] = useState<CartType[]>(parseCartList);

    const [cartList, setCartList] = useState<CartType[]>(() => {
        const cList = isLocalStorageAvailable() ? localStorage.getItem('cartList') : null;
        return cList !== null ? JSON.parse(cList) : [];
    });
    const [recoilTotalPrice, setRecoilTotalPrice] = useRecoilState<number>(totalPriceState);
    // const [cartList, setCartList] = useRecoilState();
    // const recoilValue = useRecoilValue(CartListState);
    const [recoilOriginPrice, setRecoilOriginPrice] = useRecoilState<number>(totalOriginPriceState);

    let tOriginPrice = 0; // 총 원가합
    
    const handlePrevBtnClick = () => {
        console.log("CartList / handlePrevBtnClick!!!");
        localStorage.setItem("cartList", JSON.stringify(cartList));
        // setCartList(cartList);
        rt.back();
    }

    useEffect(() => {
        console.log("CartList / delProductId: ", delProductId);
        isLocalStorageAvailable();
        let tPrice = 0; // totalPrice - 결제금액
        tOriginPrice = 0; // totalOriginPrice - 총원가 

        if (delProductId !== 0) {
            // let newCartList = cartList.map((cart : CartType) => {
            //     let newCart = {...cart}
            //     if (cart.product_id !== delProductId) {
            //         tPrice += cart.cartQty * cart.price;
            //         return cart;
            //     }
            // })
            let newCartList = [];
            for (let i = 0; i < cartList.length; i++) {
                if ( cartList[i].product_id === delProductId ) {
                    continue;
                } else {
                    tPrice += cartList[i].cartQty * cartList[i].price;
                    tOriginPrice += cartList[i].cartQty * cartList[i].origin_price;
                    newCartList.push(cartList[i]);
                }
            }
            console.log("after / tempCartList: ", newCartList);
            setCartList(newCartList);
            setTotalPrice(tPrice);
            // setTotalOriginPrice(tOriginPrice);
            
        
        } else {
            for (let i = 0; i < cartList.length; i++) {
                tPrice += cartList[i].cartQty * cartList[i].price;
                tOriginPrice += cartList[i].cartQty * cartList[i].origin_price;
            }
            setTotalPrice(tPrice);
            // setTotalOriginPrice(tOriginPrice);
        }
        
    }, [delProductId])
    const convertToCartItemType = (itemList: CartType[]) => {
        let retList = [];
        for (let i = 0; i < itemList.length; i++) {
            const item = {
                'productId': 0,
                'cartQty': 0
            };
            item['productId'] = itemList[i].product_id;
            item['cartQty'] = itemList[i].cartQty;
            retList.push(item);
        }
        return retList;
    }

    const handleModal = () => {
        console.log('modal')
        localStorage.setItem("cartList", JSON.stringify(cartList));
        setRecoilTotalPrice(totalPrice);
        setRecoilOriginPrice(tOriginPrice);
        setShowPointGuideModal(true);
        if (cartList.length === 0) {
            alert("장바구니가 비어있습니다");
            setOrderName('');
            return;
        } else { // 주문이름 설정
            const firstItem = cartList[0].name;
            const cnt = cartList.length - 1;
            setOrderName(firstItem + " 외 " + cnt + "건");
            const url = mapToBE(`/api/v1/carts/add`);
            const cartItemListData = convertToCartItemType(cartList);
            let tOPrice = 0;
            for (let c = 0; c < cartList.length; c++) {
                tOPrice += cartList[c].origin_price;
            }

            const reqData = {
                "storeId": process.env.NEXT_PUBLIC_ENV_STORE_ID,
                "posId": process.env.NEXT_PUBLIC_ENV_POS_ID,
                "cartItemList": cartItemListData,
                "totalPrice": totalPrice,
                "totalOriginPrice": tOPrice,
                "orderName": firstItem + " 외 " + cnt + "건",
            }
            axios(url, 
                {
                    method: 'post',
                    data: reqData
                }
            )
            .then((res) => {
                console.log("cart-list/index.tsx/handleModal()/res: ", res);
            })
            .catch((err) => {
                console.log("cart-list/index.tsx/handleModal()/err: ", err);
            })
        }
      }

    return (
        <>
        <PointGuideModal 
            show={showPointGuideModal} 
            onClose={setShowPointGuideModal} 

        />
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
                                {/* <th>상품이미지</th> */}
                                <th>상품명</th>
                                <th>수량</th>
                                <th>단가</th>
                                <th>금액</th>
                                <th></th>
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
                                    totalOriginPrice={totalOriginPrice}
                                    setTotalOriginPrice={setTotalOriginPrice}
                                    event={cart.event}
                                />
                            ))
                        }
                    </tbody>
                </table>
            <div className={style.footer}>    
                    <div>
                        <button onClick={handlePrevBtnClick}>
                            <nav>
                                <ul className={style.pre_btn}>
                                    <li>
                                        <Image
                                            src="/images/arrowLeft.png"
                                            alt="arrowLeft"
                                            className={style.arrowLeft}
                                            width={41}
                                            height={41}
                                        />
                                    </li>
                                    <li>
                                        이전단계
                                    </li>
                                </ul>
                            </nav>
                        </button>
                    </div>
                    
                    <button onClick={handleModal}>
                            <nav>
                                <ul className={style.next_btn}>
                                    <li>
                                        ₩{formatMoney(totalPrice)}
                                    </li>
                                    <li>
                                        <Image
                                            src="/images/won.png"
                                            alt="won"
                                            className={style.won}
                                            width={50}
                                            height={50}
                                        />
                                    </li>
                                    <li>
                                        결제하기
                                    </li>
                                    <li>
                                        <Image
                                            src="/images/arrowRight.png"
                                            alt="arrowRight"
                                            className={style.arrowRight}
                                            width={41}
                                            height={41}
                                        />
                                    </li>
                                </ul>
                            </nav>
                        </button>
                    </div>
            </div>
        </>
    )

}

CartList.getLayout = function getLayout(page: React.ReactNode) {
    return(
      <>
        <CartListLayout>
            {page}
        </CartListLayout>
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