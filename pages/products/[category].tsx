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

// import {products, carts} from '../../data/productsAndCarts.json';
// import res  from '../../data/products-data.json';
import CartItem from "../cart-list/CartItem";
import { NextPageWithLayout } from "../_app";

const Products : NextPageWithLayout = () => {
    const router = useRouter();
    const [itemList, setItemList] = useState<ProductType[]>([]);
    const [activeState, setActiveState] = useState<boolean[]>([false, false, false, false, false, false, false, false, false]);
    const [slides,  setSlides] = useState();
    const [cartList, setCartList] = useState<CartType[]>(() => {
        const cList = isLocalStorageAvailable() ? localStorage.getItem('cartList') : null;
        return cList !== null ? JSON.parse(cList) : [];
    });

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

    const handleCategoryBtnClick = (id:number) => {
        setState(id);
        for (let i = 0; i < activeState.length; i++) {
            if (id === i) {
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
                return;
            }
        }
        // 처음 장바구니에 담기는 상품 
        let cartQty = 1;
        let cart = convertProductToCart(product, cartQty);
        setCartList([...cartList, cart]);
    }

    console.log("Procuts / router.query.[category]: ", router.query.category);
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
        localStorage.setItem("cartList", JSON.stringify(cartList));
    }

    useEffect(() => {
        let c = router.query.category;
        let category_index = category_map[c ? c.toString() : "과일"];
        handleCategoryBtnClick(category_index);
        const url_products = `http://localhost:3001/products`;
        axios.get(url_products)
        .then((res : any) => {
            console.log("products/res: ", res);
            setItemList(res.data)
        })
        .catch((err) => console.log("products/err: ", err));
    

        console.log("final cartList: ", cartList);
        // setItemList(res.data)
        // setCartList(carts);
    }, [router.query, cartList])


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
                        <li onClick={() => handleCategoryBtnClick(index)}  key={index} className={activeState[index] ? `${style.active}` : `${style.deactive}`} >
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
                                width={200}
                                height={200}
                            />
                            <p className={style.productItemName}>
                                {item.name}
                            </p>
                            <p className={style.productItemPrice}>
                                {formatMoney(item.price)}
                            </p> 
                            <p className={item.isEvent === true ? `${style.eventProductItem}` : `${style.notEventProductItem}`}>
                                기획
                            </p>                                
                        </div>
                    ))
                }
            </div>
            

            <div className={styles.pre_btn}>
                <Link href='/'>
                    <button>이전단계</button>
                </Link>
            </div>

            <div className={styles.next_btn}>
                <Link href = '/cart-list'>
                    
                    <button onClick={handleCheckCartBtnClick}>상품확인</button>
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
                        )) : <div>선택하신 상품이 없습니다.</div>
                    }
            </div>  
        </div>
    </>
    );
}

function isLocalStorageAvailable() {
    try {
        const testKey = 'test';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
      } catch (e) {
        console.log("isLocalStorageAvailable / e: ", e);
        return false;
      }
}

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
  