import style from './Button.module.css'
import Image from 'next/image'

interface Props {
    onClick: () => void;
    src: string;
    alt: string;
    text?: string;
    style? : React.CSSProperties;
    styleText?: string;
}

const Button: React.FC<Props> = ({ onClick, src, alt, text, styleText }) => {
    return (
        <button className={`${styleText && styleText == 'style.lower' ? style.lower : style.btn }`} onClick={onClick}>
            <div className={style.content}>
                <Image src={src} alt={alt} width={141} height={140}/>
                <span className={style.text}>
                    {text}
                </span>
            </div>
        </button>
    )
}

export default Button;