import { CartListState } from "@/state"
import { CartType } from "@/types/CartType";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil"

export default function Test() {
    const [testList, setTestList] = useRecoilState(CartListState);
    const recoilValue = useRecoilValue(CartListState);
    useEffect(() => {
        console.log("recoilValue: ", recoilValue);
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