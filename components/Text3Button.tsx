import style from './Text3Button.module.css'
import Image from 'next/image'

interface Props {
    onClick: () => void;
    src: string;
    alt: string;
    text1?: string;
    text2? : string;
    text3? : string;
    style? : React.CSSProperties;
}

const Text3Button: React.FC<Props> = ({ onClick, src, alt, text1, text2, text3 }) => {
    return (
        <button className={style.btn} onClick={onClick}>
            <div className={style.content}>
                <Image src={src} alt={alt} width={141} height={140}/>
                <span className={style.text}>
                    {text1}<br/>
                    {text2}<br/>
                    {text3}
                </span>
            </div>
        </button>
    )
}

export default Text3Button;