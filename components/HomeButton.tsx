import style from './HomeButton.module.css'
import Image from 'next/image'

interface Props {
    onClick: () => void;
    src: string;
    alt: string;
    text: string;
}

const Button: React.FC<Props> = ({ onClick, src, alt, text }) => {
    return (
        <button className={style.btn} onClick={onClick}>
            <div className={style.content}>
                <Image src={src} alt={alt} width={35} height={35}/>
                <span className={style.text}>
                    {text}
                </span>
            </div>
        </button>
    )
}

export default Button;