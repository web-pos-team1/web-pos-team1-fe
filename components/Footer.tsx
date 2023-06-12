import router from 'next/router';
import style from './Footer.module.css';
import Image from 'next/image'
import { formatMoney } from './globalfunctions/formatMoney';
import { useRecoilValue } from 'recoil';
import { totalPriceState } from '@/state/totalPriceState';

export default function Footer(
    props: {
        finalTotalPriceToBE: number
    }
) {
    const totalPrice = useRecoilValue(totalPriceState);

    return (
        <footer className={style.footerMenu}>
            <div className={style.pre_btn}>
                <nav>
                    <ul onClick={() => router.back()}>
                        <li>
                            <Image
                                src="/images/arrowLeft.png"
                                alt="arrowLeft"
                                className={style.arrowLeft}
                                width={41}
                                height={41}
                            />
                        </li>
                        <li>
                            이전단계
                        </li>
                    </ul>
                </nav>
            </div>

            <div className={style.next_btn}>
                <nav>
                    <ul>
                        <li>
                            결제금액
                        </li>
                        <li>
                            <Image
                                src="/images/won.png"
                                alt="won"
                                className={style.won}
                                width={50}
                                height={50}
                            />
                        </li>
                        <li>
                        {/* ₩{formatMoney(totalPrice ? totalPrice : 1)} */}
                            ₩{formatMoney(props.finalTotalPriceToBE ? props.finalTotalPriceToBE : totalPrice)}
                        </li>
                    </ul>
                </nav>  
            </div>
        </footer>
)
}
