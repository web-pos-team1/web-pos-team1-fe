import { useRouter } from "next/router"
import { ProductType } from "@/types/ProductType";
import React, { useEffect, useState } from "react";
import { categoryList } from '../../data/categorList.json';
import style from './Products.module.css';
import styles from '@/styles/Products.module.css'
import Head from 'next/head'
import Link from 'next/link'

import res  from '../../data/products-data.json';

export default function Products() {
    const router = useRouter();
    const [itemList, setItemList] = useState<ProductType[]>([]);
    const [activeState, setActiveState] = useState<boolean[]>([false, false, false, false, false, false, false, false, false]);
    const [slides,  setSlides] = useState();

    const category_map : {[key: string] : number} = {
        "과일": 0,
        "채소": 1,
        "수산": 2,
        "정육/계란": 3,
        "쌀/견과": 4,
        "선물류": 5,
        "빵/유제품": 6,
        "간식": 7,
        "소스/오일": 8
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

    console.log("Procuts / router.query.과일: ", router.query.category);

    useEffect(() => {
        let category_index = category_map[router.query.category ? 0 : String(router.query.category)]
        handleCategoryBtnClick(category_index);
        setItemList(res.data);
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
            상품 리스트 페이지
            <nav className="product-list-nav">
                <ul>
                    {
                    categoryList.map((category: string, index: number) => (
                        <li key={index} className={activeState[index] ? `${style.active}` : ''} >
                            <p>
                                {index}|{category}
                            </p>
                        </li>
                    ))
                    }
                </ul>
            </nav>
            {
                itemList.map((item: ProductType) => (
                    <div key={item.product_code}>
                        <img src={item.image_url} alt={item.description} />
                        <p>{item.name}</p>
                        <p>{item.price}</p>
                    </div>
                ))
            }
        <div className={styles.pre_btn}>
            <Link href='/'>
                <button>이전단계</button>
            </Link>
        </div>

        <div className={styles.next_btn}>
            <Link href='/carts'>
                <button>상품등록</button>
            </Link>
        </div>
        </div>
    </>
    )
}