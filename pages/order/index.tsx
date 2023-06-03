import { CartListState } from "@/state/CartListState";
import { PayObjectState } from "@/state/PayObjectState";
import { CartType } from "@/types/CartType";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function Order() {
    const [cartList, setCartList] = useRecoilState(CartListState);
    const [payObjectState, setPayObjectState] = useRecoilState(PayObjectState);
    useEffect(() => {
        let cartListFromLocalStorage = localStorage.getItem("cartList");
        let list = JSON.parse(cartListFromLocalStorage ? cartListFromLocalStorage : "[]");
        console.log("list: ", list);
        setCartList(list);
    }, [])
    return(
        <div>
            {
                cartList && cartList.map((cart:CartType, index:number) => (
                    <div key={index}>
                        <img src={cart.image_url} />
                        <div>
                            상품이름: {cart.name}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}