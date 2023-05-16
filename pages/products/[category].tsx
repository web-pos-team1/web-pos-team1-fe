import { useRouter } from "next/router"
import { ProductType } from "@/types/ProductType";
import React, { useEffect, useState } from "react";
import { categoryList } from '../../data/categorList.json';
import { CartType } from "@/types/CartType";
import Layout from '@/components/layouts/layout'
import style from './Products.module.css';
import styles from '@/styles/Carts.module.css';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import Image from "next/image";
import { formatMoney } from "@/components/globalfunctions/formatMoney";
import Cart from "../cart-list/Cart";
import { mapToBE } from "@/components/globalfunctions/mapToBE";
// import {products, carts} from '../../data/productsAndCarts.json';
// import res  from '../../data/products-data.json';
import CartItem from "../cart-list/CartItem";
import { NextPageWithLayout } from "../_app";
import FooterPreBtn from "@/components/FooterPreBtn";
import FooterCheckCartBtn from "@/components/FooterCheckCartBtn";
import { useRecoilState, useRecoilValue } from "recoil";
import { CartListState } from "@/state";

const Products : NextPageWithLayout = () => {
    const router = useRouter();
    const [itemList, setItemList] = useState<ProductType[]>([]);
    const [activeState, setActiveState] = useState<boolean[]>([false, false, false, false, false, false, false, false, false]);
    const [slides,  setSlides] = useState();
    // const [cartList, setCartList] = useState<CartType[]>(() => {
    //     const cList = isLocalStorageAvailable() ? localStorage.getItem('cartList') : null;
    //     return cList !== null ? JSON.parse(cList) : [];
    // });

    const [cartList, setCartList] = useRecoilState(CartListState);
    const recoilValue = useRecoilValue(CartListState);

    const [delProductId, setDelProductId] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [cartId, setCartId] = useState();
    const [categoryIndex, setCategoryIndex] = useState<number>(0);


    const category_map : {[key: string] : number} = {
        "과일": 0,
        "채소": 1,
        "정육-계란": 2,
        "수산": 3,
        "쌀-견과": 4,
        "우유-유제품": 5,
        "간식": 6,
        "소스-오익": 7,
        "선물류": 8,
    }

    const handleCategoryBtnClick = (category:string) => {
        const id = category_map[category];
        setState(id);
        for (let i = 0; i < activeState.length; i++) {
            if (id === i) {
                activeState[i] = true;
            }
        }
        setActiveState([...activeState]);
        console.log("category select btn click");
        console.log("category: ", category); // "정육/계란"
        console.log("router.pathname: ", router.pathname);

    }
        
    const convertSlashToDash = (category : string) => {
        return category.replace('/', '-');
    }

    const setState = (id:number) => {
        for (let i = 0; i < activeState.length; i++) {
            if (activeState[i]) {
                if (id === i) break;
                activeState[i] = false;
            } else if (id === i) {
                activeState[i] = true;
            }
        }
        setActiveState([...activeState]);
    }

    const handleAddCartClick = (product : ProductType) => {
        console.log("handleAddCartClck()/product: ", product);
        for (let i = 0; i < cartList.length; i++) {
            // 이미 장바구니에 담겼던 상품
            if (cartList[i].product_id === product.product_id) {
                cartList[i].cartQty += 1
                setCartList([...cartList]);
                return;
            }
        }
        // 처음 장바구니에 담기는 상품 
        let cartQty = 1;
        let cart = convertProductToCart(product, cartQty);
        setCartList([...cartList, cart]);
        console.log("router.pathname: ", router.pathname);
        router.push("/products/" + router.query.category);
    }

    const convertProductToCart = (product : ProductType, cartQty: number) => {
        let cart : CartType = {
            product_id: product.product_id,
            product_code: product.product_code,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            qty: product.qty,
            cartQty: cartQty
        };
        return cart;
    }

    const handleCheckCartBtnClick = () => {
        console.log("handleCheckCartBtnClick!!");
        // localStorage.setItem("cartList", JSON.stringify(cartList));

        // setCartList(cartList);
    }

    useEffect(() => {
        console.log("Procuts / router.query.[category]: ", router.query.category);
        const c = router.query.category;
        handleCategoryBtnClick(c ? c.toString() : "과일");  // router.push 하면 계속 요청보낸다

        const url_products = mapToBE(`/api/v1/products/${router.query.category}`);
        // url_products = `http://localhost:3001/products`;
        console.log("url_porducts: ", url_products);
        axios(url_products,
            {
                method: 'get'
            }
        )
        .then((res : any) => {  // res.data.status: 200 <=  < 300
            console.log("products/res: ", res);
            setItemList(res.data)
        }) 
        // err.data.status 400, 500 이 꼳힘
        .catch((err) => console.log("products/err: ", err));
    

        // Cart 컴포넌트에서 "삭제" 이벤트 발생했을 경우
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
        // setItemList(res.data)
        // setCartList(carts);
        console.log("router.pathname: ", router.pathname);
        console.log("router.query.category: ", router.query.category);
    }, [router.query, delProductId])


    return (
    <>
        <Head>
            <title>POS products list</title>
            <meta name="description" content="Products list page" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <div>
            <nav className={style.categoryNav}>
                <ul>
                    {
                    categoryList.map((category: string, index: number) => (
                        <li onClick={() => handleCategoryBtnClick(category)}  key={index} className={activeState[index] ? `${style.active}` : `${style.deactive}`} >
                                {category}
                        </li>
                    ))
                    }
                </ul>
            </nav>
            <div className={style.productList}>
                {
                    itemList.map((item: ProductType) => (
                        <div onClick={() => handleAddCartClick(item)} key={item.product_id} className={style.productItem}>
                            <Image 
                                src={item.image_url} 
                                alt={item.description} 
                                width={210}
                                height={210}
                            />
                            <p className={style.productItemName}>
                                {item.name}
                            </p>
                            <p className={style.productItemPrice}>
                                {formatMoney(item.price)}<span>원</span>
                            </p> 
                            <p className={item.isEvent === true ? `${style.eventProductItem}` : `${style.notEventProductItem}`}>
                                기획
                            </p>                                
                        </div>
                    ))
                }
            </div>
        
            <div className={style.footer}>
                <FooterPreBtn />
                <Link href="/cart-list">
                <div onClick={handleCheckCartBtnClick}>
                    <FooterCheckCartBtn />
                </div>
                </Link>
            </div>

            <div className={style.cartList}>
                {
                        cartList.length > 0 ? 
                        cartList.map((cart: CartType, index: number) => (
                            <div className={style.cartWrap} key={index}>
                                <Cart
                                    item={cart}
                                    delProductId={delProductId}
                                    setDelProductId={setDelProductId}
                                    totalPrice={totalPrice}
                                    setTotalPrice={setTotalPrice}
                                />
                            </div>
                        )) : <div></div>
                    }
            </div>  
        </div>
    </>
    );
}

// function isLocalStorageAvailable() {
//     try {
//         const testKey = 'test';
//         localStorage.setItem(testKey, testKey);
//         localStorage.removeItem(testKey);
//         return true;
//       } catch (e) {
//         console.log("isLocalStorageAvailable / e: ", e);
//         return false;
//       }
// }

Products.getLayout = function getLayout(page: React.ReactNode) {
    return(
      <>
      <Layout>
        {page}
      </Layout>
      </>
    )
  }
  
  export default Products;
  