import React from "react";
import Header from "@/components/Header"
import Link from "next/link";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { RecoilRoot, useRecoilState } from "recoil";
import { LanguageIndexState } from "@/state/LanguageIndexState";
import { IBM_Plex_Sans_KR } from "next/font/google";

export default function CategorylistLayout(props:{children:React.ReactNode}) {
    const [languageIndex, setLanguageIndex] = useRecoilState(LanguageIndexState);
    return (
        <div>
                <Header 
                    languageIndex={languageIndex}
                    setLanguageIndex={setLanguageIndex}
                />
            {props.children}
            <Text 
            text="카테고리를 선택해 주세요" 
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '40px', margin: '85px 40px 160px 40px' }}>
                <Link href="/products/과일">
                    <Button src="/images/fruit.png" alt="fruit category" text="과일" onClick={() => console.log('btn 1')}/>
                </Link>
                <Link href="/products/채소">
                    <Button src="/images/vegi.png" alt="vigetable category" text="채소" onClick={() => console.log('btn 2')}/>
                </Link>
                <Link href="/products/정육-계란">
                    <Button src="/images/chicken.png" alt="meat&eggs category" text="정육 / 계란" onClick={() => console.log('btn 3')}/>
                </Link>
                <Link href="/products/수산">
                    <Button src="/images/seafood.png" alt="seafood category" text="수산" onClick={() => console.log('btn 4')}/>
                </Link>
                <Link href="/products/쌀-견과">
                    <Button src="/images/rice.png" alt="rice&nuts category" text="쌀 / 견과" onClick={() => console.log('btn 5')}/>
                </Link>
                <Link href="/products/우유-유제품">
                    <Button src="/images/milk.png" alt="milk&daily products category, " text="우유 / 유제품" onClick={() => console.log('btn 6')}/>
                </Link>
                <Link href="/products/간식">
                    <Button src="/images/snack.png" alt="snack category" text="간식" onClick={() => console.log('btn 7')}/>
                </Link>
                <Link href="/products/소스-오일">
                    <Button src="/images/sauce.png" alt="sauce&oil category" text="소스 / 오일" onClick={() => console.log('btn 8')}/>
                </Link>
                <Link href="/products/선물류">
                    <Button src="/images/gift.png" alt="gift category" text="선물류" onClick={() => console.log('btn 9')}/>
                </Link>
            </div>
        </div>
    )
}

// import React from "react";
// import Location from "@/components/Location";
// import Header from "@/components/Header"
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import Button from "@/components/Button";
// import Text from "@/components/Text";

// export default function PointsLayout(props:{children:React.ReactNode}) {
    
//     const buttons = [
//         {
//             src: "/images/dial.png", 
//             alt: "enter the phone number", 
//             text: "전화번호 입력", 
//             onClick: () => console.log('btn 1')
//         },
//         {
//             src: "/images/barcode.png", 
//             alt: "scanning barcode", 
//             text: "바코드 스캔", 
//             onClick: () => console.log('btn 2')
//         },
//         {
//             src: "/images/pointSensing.png", 
//             alt: "sensing the point card", 
//             text: "포인트카드 센싱", 
//             onClick: () => console.log('btn 3')
//         },
//         {
//             src: "/images/forbiden.png", 
//             alt: "pass this step", 
//             text: "적립 안함", 
//             onClick: () => console.log('btn 4')
//         }
//     ];

//     return (
//         <div>
//             <Header />
//             <Location />
//             {props.children}
//             <Text text="신세계포인트 적립방법을 선택해 주세요" />
//             <div
//                 style={{ 
//                     display: 'grid', 
//                     gridTemplateColumns: 'repeat(2, 1fr)', 
//                     gridGap: '82px', 
//                     margin: '90px 180px 160px 180px' 
//                     }}
//             >
//                 {buttons.map((button, index) => (
//                     <Button 
//                         key={index} 
//                         src={button.src} 
//                         alt={button.alt} 
//                         text={button.text} 
//                         onClick={button.onClick} 
//                     />
//                 ))}
//             </div>
//             <Link href='/carts'>
//                 <Footer />
//             </Link>
//         </div>
//     )
// }
