import style from './Text2Button.module.css'
import Image from 'next/image'

interface Props {
    onClick: () => void;
    src: string;
    alt: string;
    text1?: string;
    text2? : string;
    style? : React.CSSProperties;
}

const Text2Button: React.FC<Props> = ({ onClick, src, alt, text1, text2 }) => {
    return (
        <button className={style.btn} onClick={onClick}>
            <div className={style.content}>
                <Image src={src} alt={alt} width={141} height={140}/>
                <span className={style.text}>
                    {text1}<br/>
                    <div className={style.text2}>{text2}</div>
                </span>
            </div>
        </button>
    )
}

export default Text2Button;