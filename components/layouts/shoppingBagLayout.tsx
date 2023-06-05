import React from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import Link from "next/link";
import Text2Button from "@/components/Text2Button";
import Text from "@/components/Text";
import style from "./shoppingBagLayout.module.css"
import GiftCardModal from "../GiftCardGuideModal";
import { RecoilRoot, useRecoilState } from "recoil";
import { totalPriceState } from "@/state/totalPriceState";

export default function ShoppingBagLayout(props: { children: React.ReactNode }) {
    const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState);
    
    return (
        <>

      <div>
        <RecoilRoot>
          <Header />
        <Location />
        {props.children}
          <Footer 
            totalPrice={totalPrice}
          />
        </RecoilRoot>
      </div>
      </>
    );
  }
  
