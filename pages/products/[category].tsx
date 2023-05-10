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
import CartItem from "../cart-list-confirm/CartItem";
import { NextPageWithLayout } from "../_app";

const Products : NextPageWithLayout = () => {
    const router = useRouter();
    const [itemList, setItemList] = useState<ProductType[]>([]);
    const [activeState, setActiveState] = useState<boolean[]>([false, false, false, false, false, false, false, false, false]);
    const [slides,  setSlides] = useState();
    const [cartList, setCartList] = useState<CartType[]>([]);

    const [delCheck, setDelCheck] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartId, setCartId] = useState();
    const [categoryIndex, setCategoryIndex] = useState<number>(0);


    const category_map : {[key: string] : number} = {
        "과일": 0,
        "채소": 1,
        "수산": 2,
        "정육-계란": 3,
        "쌀-견과": 4,
        "선물류": 5,
        "빵-유제품": 6,
        "간식": 7,
        "소스-오일": 8,
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
                setCartList([...cartList]);
                return;
            }
        }
        // 처음 장바구니에 담기는 상품 
        let cartQty = 1;
        let cart = convertProductToCart(product, cartQty);
        setCartList([...cartList, cart]);
    }

    console.log("Procuts / router.query.과일: ", router.query.category);
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

    useEffect(() => {
        let c = router.query.category;
        let category_index = category_map[c ? c.toString() : "과일"];
        handleCategoryBtnClick(category_index);
        const url_products = `http://localhost:3001/products`;
        const url_carts = `http://localhost:3001/carts`;
        axios.get(url_products)
        .then((res : any) => {
            console.log("products/res: ", res);
            setItemList(res.data)
        })
        .catch((err) => console.log("products/err: ", err));
        axios.get(url_carts)
        .then((res:any) => {
            console.log("carts/res: ", res);
            setCartList(res.data);
        })
        .catch((err) => console.log("carts/err: ", err));
        // setItemList(res.data)
        // setCartList(carts);
    }, [router.query])


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
                        <li onClick={() => handleCategoryBtnClick(index)}  key={index} className={activeState[index] ? `${style.active}` : `${style.deactive}`} 
                        >
                            <Link href={`/products/${categoryList[index]}`}>
                            {category}
                            </Link>
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

        {/* <div className={styles.next_btn}>
            <Link 
                href = {"/detail"}
                state = {{
                cartList: cartList 
                }}
            >
            <div>
                <h1>{props.title}</h1>
            </div>
            </Link>
        </div> */}

        <h3 style={{alignContent: "center"}}>
            장바구니
        </h3>
        <div>
        {
                cartList.map((cart: CartType, index: number) => (
                    <div className={style.cartWrap} key={index}>
                        <Cart
                            key={index}
                            item={cart}
                            delCheck={delCheck}
                            setDelCheck={setDelCheck}
                            totalPrice={totalPrice}
                            setTotalPrice={setTotalPrice}
                        />
                    </div>
                ))
            }

            <br/>
            <br/>
            <br/>
        <table className={style.cartTable}>
        <thead className={style.cartTableHead}>
            <tr >
                <th>상품이미지</th>
                <th>상품명</th>
                <th>수량</th>
                <th>단가</th>
                <th>금액</th>
            </tr>
        </thead>
        <tbody>
            {
                cartList.map((cart: CartType, index: number) => (
                    <CartItem
                        key={index}
                        item={cart}
                        delCheck={delCheck}
                        setDelCheck={setDelCheck}
                        totalPrice={totalPrice}
                        setTotalPrice={setTotalPrice}
                    />
                ))
            }
                </tbody>
            </table>
        </div>
        </div>
    </>
    );
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
  