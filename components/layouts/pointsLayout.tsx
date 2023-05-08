// import React from "react";
// import Location from "@/components/Location";
// import Header from "@/components/Header"
// import Footer from "@/components/Footer";
// import Link from "next/link";
// import Button from "@/components/Button";
// import Text from "@/components/Text";

// export default function PointsLayout(props:{children:React.ReactNode}) {
//     return (
//         <div>
//             <Header />
//             <Location />
//             {props.children}
//             <Text text="신세계포인트 적립방법을 선택해 주세요" />
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '82px', margin: '90px 198px 160px 198px' }}>
//                 <Button src="/images/dial.png" alt="enter the phone number" text="전화번호 입력" onClick={() => console.log('btn 1')}/>
//                 <Button src="/images/barcode.png" alt="scanning barcode" text="바코드 스캔" onClick={() => console.log('btn 2')}/>
//                 <Button src="/images/pointSensing.png" alt="sensing the point card" text="포인트카드 센싱" onClick={() => console.log('btn 3')}/>
//                 <Button src="/images/forbiden.png" alt="pass this step" text="적립 안함" onClick={() => console.log('btn 4')}/>
//             </div>
//             <Link href='/carts'>
//             <Footer />
//             </Link>
//         </div>
//     )
// }

import React from "react";
import Location from "@/components/Location";
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/Button";
import Text from "@/components/Text";

export default function PointsLayout(props:{children:React.ReactNode}) {
    
    const buttons = [
        {
            src: "/images/dial.png", 
            alt: "enter the phone number", 
            text: "전화번호 입력", 
            onClick: () => console.log('btn 1')
        },
        {
            src: "/images/barcode.png", 
            alt: "scanning barcode", 
            text: "바코드 스캔", 
            onClick: () => console.log('btn 2')
        },
        {
            src: "/images/pointSensing.png", 
            alt: "sensing the point card", 
            text: "포인트카드 센싱", 
            onClick: () => console.log('btn 3')
        },
        {
            src: "/images/forbiden.png", 
            alt: "pass this step", 
            text: "적립 안함", 
            onClick: () => console.log('btn 4')
        }
    ];

    return (
        <div>
            <Header />
            <Location />
            {props.children}
            <Text text="신세계포인트 적립방법을 선택해 주세요" />
            <div
                style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gridGap: '82px', 
                    margin: '90px 180px 160px 180px' 
                    }}
            >
                {buttons.map((button, index) => (
                    <Button 
                        key={index} 
                        src={button.src} 
                        alt={button.alt} 
                        text={button.text} 
                        onClick={button.onClick} 
                    />
                ))}
            </div>
            <Link href='/carts'>
                <Footer />
            </Link>
        </div>
    )
}
