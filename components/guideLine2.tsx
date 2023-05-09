import style from './Button.module.css'
import Image from 'next/image'

interface Props {
    src: string;
    alt: string;
}

const GuideLine2: React.FC<Props> = ({ src, alt }) => {
    return (
            <div>
                <Image src={src} alt={alt} width={1} height={1}/>
            </div>
    )
}

export default GuideLine2;