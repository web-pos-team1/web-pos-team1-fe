import { CartListState } from "@/state/CartListState"
import { totalPriceState } from "@/state/totalPriceState";
import { CartType } from "@/types/CartType";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil"

export default function Test() {
    const [testList, setTestList] = useRecoilState(CartListState);
    const recoilValue = useRecoilValue(CartListState);

    const [tPrice, setTPrice] = useRecoilState(totalPriceState);
    const totalPrice = useRecoilValue(totalPriceState);
    useEffect(() => {
        console.log("recoilValue: ", recoilValue);
        console.log("reset recoil CartListState");
        console.log("totalPrice from recoil: ", totalPrice);
        console.log("tPrice from recoil: ", totalPrice);
        setTestList([]);
    }, [])
    return(
        <div>
            {
                recoilValue && recoilValue.map((cart:CartType, index:number) => (
                    <div key={index}>
                        <div>
                            <img src={cart.image_url} />
                            <div>
                                {cart.name}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}