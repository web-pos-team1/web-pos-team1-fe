import style from './HeaderButton.module.css'
import Image from 'next/image'

interface Props {
    onClick: () => void;
    src: string;
    alt: string;
    style? : React.CSSProperties;
}

const HeaderButton: React.FC<Props> = ({ onClick, src, alt }) => {
    return (
        <button className={style.btn} onClick={onClick}>
            <div className={style.content}>
                <Image src={src} alt={alt} width={80} height={80}/>
            </div>
        </button>
    )
}

export default HeaderButton;