import style from './Button.module.css'
import Image from 'next/image'

interface Props {
    onClick: () => void;
    src: string;
    alt: string;
    image: string;
    text: string;
    style? : React.CSSProperties;
}

const Button: React.FC<Props> = ({ onClick, src, alt, text }) => {
    return (
        <button className={style.btn} onClick={onClick}>
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