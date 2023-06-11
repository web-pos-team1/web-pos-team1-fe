import style from './Text.module.css'

interface Props {
    text?: string
}

const Text: React.FC<Props> = ({ text }) => {
    return (
        <div className={style.text}>
            {text}
        </div>
    )
}

export default Text;